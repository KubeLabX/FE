import React, { useState, useEffect } from "react";

function PodMetrics({ namespace }) {
  //namespace: 부모 컴포넌트에서 전달받는 props. Kubernetes 네임스페이스 이름
  const [metrics, setMetrics] = useState([]); //metrics: Pod 메트릭 데이터를 저장하는 상태 (초기값: 빈 배열).
  const [loading, setLoading] = useState(true); //데이터를 불러오는 중인지 나타내는 상태 (초기값: true).
  const [error, setEffor] = useState(null); //API 호출오류

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        //fetch: 백엔드(/api/pods-metrics/<namespace>/)에 GET 요청을 보냄.
        const response = await fetch(`/api/pods-metrics/${namespace}/`);
        //응답 데이터를 JSON으로 변환하고, 이를 metrics 상태에 저장.
        const data = await response.json();
        setMetrics(data); //가져온 데이터를 상태에 저장
      } catch (error) {
        //API 호출 실패 시 에러를 로그에 출력.
        console.error("Error fetching metrics:", error);
      } finally {
        //API 호출 완료 후 로딩 상태를 false로 설정.
        setLoading(false); //로딩 상태를 false로 변경
      }
    };
    fetchMetrics();
  }, [namespace]); //의존성배열 [namespace] : 네임스페이스가 변경될 때마다 fetchMetrics가 다시 실행됨

  if (loading) return <div>Loading...</div>;
  //데이터가 로드되기 전에는 "Loading..." 메시지를 표시
  if (error) return <div>Error: {error}</div>;

  //UI 렌더 <!-- <thead>: 테이블 헤더에 컬럼 이름(Pod Name, CPU Usage, Memory Usage)을 정의 -->
  return (
    <div>
      <h1>Pod Metrics for Namespace: {namespace}</h1>
      <table>
        <thead>
          <tr>
            <th>Pod Name</th>
            <th>CPU Usage</th>
            <th>Memory Usage</th>
          </tr>
        </thead>
        <tbody>
          {metrics.map((metric) => (
            <tr key={metric.metadata.name}>
              <td>{metric.metadata.name}</td> {/*POD이름*/}
              <td>{metric.usage.cpu}</td> {/*CPU 사용량*/}
              <td>{metric.usage.memory}</td> {/*메모리 사용량*/}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Graph({ namespace = "default-namespace" }) {
  return <PodMetrics namespace={namespace} />;
}

export default Graph;
