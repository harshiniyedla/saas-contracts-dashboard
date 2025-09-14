import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import UploadModal from "../components/UploadModal"; // Modal import

export default function Dashboard() {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [riskFilter, setRiskFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const rowsPerPage = 10;

  useEffect(() => {
    fetch("/contracts.json")
      .then((res) => res.json())
      .then((data) => {
        setContracts(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch contracts");
        setLoading(false);
      });
  }, []);

  const filteredContracts = contracts.filter(
    (c) =>
      (statusFilter === "All" || c.status === statusFilter) &&
      (riskFilter === "All" || c.risk === riskFilter) &&
      (c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.parties.toLowerCase().includes(search.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredContracts.length / rowsPerPage);
  const displayedContracts = filteredContracts.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  if (loading) return <p className="p-8">Loading contracts...</p>;
  if (error) return <p className="p-8 text-red-500">{error}</p>;
  if (filteredContracts.length === 0)
    return <p className="p-8">No contracts found.</p>;

  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Contracts Dashboard</h1>

        {/* Filters + Upload Button */}
        <div className="flex flex-wrap gap-4 mb-4 items-center">
          <input
            type="text"
            placeholder="Search by name or parties"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border rounded w-64 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option>All</option>
            <option>Active</option>
            <option>Expired</option>
            <option>Renewal Due</option>
          </select>

          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option>All</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
          >
            Upload Files
          </button>
        </div>

        {/* Contracts Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Parties</th>
                <th className="py-2 px-4 border-b">Expiry</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Risk</th>
              </tr>
            </thead>
            <tbody>
              {displayedContracts.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">
                    <Link
                      to={`/contracts/${c.id}`}
                      className="text-teal-500 hover:underline"
                    >
                      {c.name}
                    </Link>
                  </td>
                  <td className="py-2 px-4 border-b">{c.parties}</td>
                  <td className="py-2 px-4 border-b">{c.expiry}</td>
                  <td className="py-2 px-4 border-b">{c.status}</td>
                  <td className="py-2 px-4 border-b">{c.risk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-2 mt-4">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => goToPage(num)}
              className={`px-3 py-1 rounded ${
                currentPage === num ? "bg-teal-500 text-white" : "bg-gray-200"
              }`}
            >
              {num}
            </button>
          ))}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>

        {/* Upload Modal */}
        <UploadModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </Layout>
  );
}
