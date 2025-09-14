import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ContractDetail() {
  const { id } = useParams();
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/contracts.json")
      .then(res => res.json())
      .then(data => {
        const found = data.find(c => c.id === id);
        if (!found) setError("Contract not found");
        else setContract(found);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch contract");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="p-8">Loading...</p>;
  if (error) return <p className="p-8 text-red-500">{error}</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">{contract.name}</h1>
      <p>Parties: {contract.parties}</p>
      <p>Status: {contract.status}</p>
      <p>Start: {contract.start}</p>
      <p>Expiry: {contract.expiry}</p>
      <p>Risk: {contract.risk}</p>

      <h2 className="mt-6 font-semibold text-lg">Clauses</h2>
      <div className="grid gap-4 mt-2">
        {contract.clauses?.map((clause, i) => (
          <div key={i} className="p-4 border rounded shadow-sm">
            <h3 className="font-bold">{clause.title}</h3>
            <p>{clause.summary}</p>
            <p>Confidence: {clause.confidence}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-6 font-semibold text-lg">AI Insights</h2>
      <ul className="list-disc ml-6 mt-2">
        {contract.insights?.map((insight, i) => (
          <li key={i}>
            {insight.risk} - {insight.message}
          </li>
        ))}
      </ul>

      <h2 className="mt-6 font-semibold text-lg">Evidence</h2>
      <ul className="list-disc ml-6 mt-2">
        {contract.evidence?.map((evi, i) => (
          <li key={i}>
            {evi.source}: {evi.snippet} (Relevance: {evi.relevance})
          </li>
        ))}
      </ul>
    </div>
  );
}
