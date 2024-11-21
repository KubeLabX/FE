import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

function PodGraph({ namespaces = [], datatype }) {
  // namespaces: 각 학생이 속한 namespace의 리스트 (부모 컴포넌트에서 전달받음)

  const [activeTab, setActiveTab] = useState("cpu"); // cpu 인지 memory인지
  const [podMetrics, setPodMetrics] = useState([]); // Pod의 CPU,MEMORY 데이터 저장
  const [websocket, setwebsocket] = useState(null); //웹소켓 인스턴스 저장

  useEffect(() => {
    // 컴포넌트가 처음 렌더링될 때와 namespaces 값이 변경될 때 실행됨

    //웹소켓 초기화
    const socket = new WebSocket("ws://your-websocket-endpoint"); //실제 서버의 웹소켓 URL로 바꿔야함
    //서버의 ws://yy-w-e에 연결. 데이터 실시간 수신할 준비 완.
    setwebsocket(socket);

    //웹소켓 메시지 수신. 서버가 웹소켓 통해 데이터 전송하면 onmessage이벤트가 호출됨

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data); //서버가 전달한 데이터(event.data)가 JSON형태로 변환

      //namespaces: 부모 컴포넌트에서 전달된 네임스페이스 목록
      const allMetrics = namespaces.flatMap((namespace) => {
        const namespaceData = data[namespace] || []; //서버에서 수신한 데이터 중 특정네임스페이스에 해당한느 데이터배열
        //서버에서 namespace-pod가 data에 저장되어있어야함. ***************
        //namespaceData: 특정 네임스페이스의 pod데이터배열

        const totalCpuUsage = namespaceData.reduce(
          //모든 pod의 cpu사용량 합산해서 저장한거
          (total, pod) => total + parseInt(pod.usage.cpu.replace("m", ""), 10),
          0
        );

        const totalMemoryUsage = namespaceData.reduce(
          (total, pod) =>
            total + parseInt(pod.usage.memory.replace("Mi", ""), 10),
          0
        );

        return namespaceData.map((pod) => ({
          studentName: pod.metadata.annotaions["student_name"] || "unknown",
          namespace: namespace,
          cpu:
            totalCpuUsage > 0
              ? (parseInt(pod.usage.cpu.replace("m", ""), 10) / totalCpuUsage) *
                100
              : 0,
          memory:
            totalMemoryUsage > 0
              ? (parseInt(pod.usage.memory.replace("Mi", ""), 10) /
                  totalMemoryUsage) *
                100
              : 0,
        }));
      });
      setPodMetrics(allMetrics);
    };

    //웹소켓 닫힐 때 처리
    socket.onclose = () => {
      console.log("WebSocket disconnected.");
    };

    return () => socket.close(); // 컴포넌트 언마운트 시 웹소켓 닫기
  }, [namespaces]);

  // Chart.js 데이터 구조
  const chartData = {
    labels: podMetrics.map(
      (metric) => `${metric.studentName} (${metric.namespace})`
    ), // X축 레이블
    datasets: [
      {
        label: activeTab === "cpu" ? "CPU Usage (%)" : "Memory Usage (%)",
        data: podMetrics.map((metric) =>
          activeTab === "cpu" ? metric.cpu : metric.memory
        ), // Y축 데이터
        borderColor:
          activeTab === "cpu"
            ? "rgba(75, 192, 192, 1)"
            : "rgba(153, 102, 255, 1)", // 선 색상
        backgroundColor:
          activeTab === "cpu"
            ? "rgba(75, 192, 192, 0.2)"
            : "rgba(153, 102, 255, 0.2)", // 영역 색상
        fill: true, // 영역 채우기
      },
    ],
  };
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // 범례 숨김
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Students (Pods)", // X축 제목
        },
        ticks: {
          autoSkip: true, // 레이블 자동 생략
          maxTicksLimit: 40, // 최대 40개의 레이블 표시 **********
          maxRotation: 45, // 레이블 회전
          minRotation: 45,
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: datatype === "cpu" ? "CPU Usage (%)" : "Memory Usage (%)", // Y축 제목
        },
        min: 0, // 최소값
        max:
          Math.max(
            ...podMetrics.map((metric) =>
              activeTab === "cpu" ? metric.cpu : metric.memory
            )
          ) + 10, // 최대값을 데이터의 최대값 + 10%로 설정
      },
    },
  };

  return (
    <div>
      <h1>
        {datatype === "cpu"
          ? "CPU Usage by Student"
          : "Memory Usage by Student"}
      </h1>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
}

export default PodGraph;
