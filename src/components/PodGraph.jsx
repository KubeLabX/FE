import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

function PodGraph({ namespaces = [] }) {
  // namespaces: 각 학생이 속한 namespace의 리스트 (부모 컴포넌트에서 전달받음)

  const [podMetrics, setPodMetrics] = useState([]); // Pod의 CPU 데이터 저장

  useEffect(() => {
    // 컴포넌트가 처음 렌더링될 때와 namespaces 값이 변경될 때 실행됨

    const fetchMetrics = async () => {
      const allMetrics = []; // 모든 namespace의 데이터를 저장할 배열

      for (const namespace of namespaces) {
        try {
          // API 호출
          const response = await fetch(`/api/pods-metrics/${namespace}/`);
          const data = await response.json();

          // 전체 CPU 사용량 계산
          const totalCpuUsage = data.reduce(
            (total, pod) =>
              total + parseInt(pod.usage.cpu.replace("m", ""), 10),
            0
          );

          // 각 Pod의 CPU 사용량을 백분율로 변환
          const namespaceMetrics = data.map((pod) => ({
            studentName: pod.metadata.annotations["student-name"] || "Unknown", // 학생 이름
            namespace: namespace, // 네임스페이스 이름
            cpu:
              totalCpuUsage > 0
                ? (parseInt(pod.usage.cpu.replace("m", ""), 10) /
                    totalCpuUsage) *
                  100
                : 0, // CPU 사용량 백분율
          }));

          allMetrics.push(...namespaceMetrics); // 결과 병합
        } catch (error) {
          console.error(
            `Error fetching data for namespace ${namespace}:`,
            error
          );
        }
      }

      setPodMetrics(allMetrics); // 상태 업데이트
    };

    const interval = setInterval(fetchMetrics, 10000); // 10초마다 데이터 갱신
    fetchMetrics(); // 첫 데이터 호출
    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 해제
  }, [namespaces]);

  // Chart.js 데이터 구조
  const chartData = {
    labels: podMetrics.map(
      (metric) => `${metric.studentName} (${metric.namespace})`
    ), // X축 레이블
    datasets: [
      {
        label: "CPU Usage (%)",
        data: podMetrics.map((metric) => metric.cpu), // Y축 데이터
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
      <h1>CPU Usage by Student</h1>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
}

export default PodGraph;
