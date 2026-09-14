import useSWR from "swr";

async function fetchApi(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt></UpdatedAt>
      <h1>Database</h1>
      <DatabaseStatus></DatabaseStatus>
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchApi, {
    refreshInterval: 2000,
  });

  let response = "Loading...";
  if (!isLoading && data)
    response = new Date(data.updated_at).toLocaleDateString("pt-BR");
  return <div>Última atualização: {response}</div>;
}

function DatabaseStatus() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchApi);

  let response = "Loading...";

  if (!isLoading && data) {
    response = (
      <>
        <div>Version: {data.dependencies.database.version}</div>
        <div>
          Opened Connections: {data.dependencies.database.opened_connections}
        </div>
        <div>Max connections: {data.dependencies.database.max_connections}</div>
      </>
    );
  }
  return <>{response}</>;
}
