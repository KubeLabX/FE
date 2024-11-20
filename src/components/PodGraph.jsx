import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

function PodGraph({ namespace }) {
  //namespace: 부모 컴포넌트에서 전달받는 props. Kubernetes 네임스페이스 이름

  const [podMetrics, setPodMetrics] = useState([]); //podMetrics : 학생이름과 cpu사용량 담은 배열 저장하는 병수

  useEffect(() => {
    //컴포넌트가 처음 렌더링될때와 namespace값이 바뀔 때마다 실행됨
    const fetchMetrics = async () => {
      //API를 호출하여 CPU 사용량 데이터를 가져옴
      const response = await fetch(`/api/pods-metrics/${namespace}/`); //fetch: 백엔드(/api/pods-metrics/<namespace>/)에 GET 요청을 보냄.
      const data = await response.json(); //응답 데이터를 JSON으로 변환하고, 이를 metrics 상태에 저장.

      // 전체 CPU 사용량을 구하고, 각 Pod의 CPU 사용량을 백분율로 변환
      const totalCpuUsage = data.reduce(
        (total, pod) => total + parseInt(pod.usage.cpu.replace("m", ""), 10),
        0
      );

      // 각 Pod의 CPU 사용량을 백분율로 계산
      const metrics = data.map((pod) => ({
        studentName: pod.metadata.annotations["student-name"],
        cpu:
          (parseInt(pod.usage.cpu.replace("m", ""), 10) / totalCpuUsage) * 100, // 백분율로 변환
      }));
      setPodMetrics(metrics); //상태 업데이트
    };

    const interval = setInterval(fetchMetrics, 1000); //10초마다 데이터 갱신
    fetchMetrics(); //첫 호출
    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 해제
  }, [namespace]);

  // Chart.js 데이터 구조
  const chartData = {
    labels: podMetrics.map((metric) => metric.studentName), // X축: 학생 이름(pod 이름)
    datasets: [
      {
        label: "CPU Usage (%)",
        data: podMetrics.map((metric) => metric.cpu), // Y축: CPU 사용량
        borderColor: "rgba(75, 192, 192, 1)", // 선 색상
        backgroundColor: "rgba(75, 192, 192, 0.2)", // 영역 색상
        fill: true, // 영역 채우기
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // 범례 표시
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Student Name (Pod)", // X축 제목
        },
        ticks: {
          autoSkip: true, // 레이블 자동 생략
          maxTicksLimit: 30, // 최대 30개의 레이블 표시
          maxRotation: 45, // 레이블 회전
          minRotation: 45,
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "CPU Usage (%)", // Y축 제목
        },
      },
    },
  };

  return (
    <div>
      <h1>CPU Usage by Student for Namespace: {namespace}</h1>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
}

export default PodGraph;
