import { useEffect, useState } from "react";
import "./Products.scss";
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/add/Add";
import { GridColDef,GridValueGetter, GridRenderCellParams } from "@mui/x-data-grid";

interface Employee {
  employeeId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  hireDate: string;
  status: string;
  jobId: string;
  departmentName: string;
  roleId: string;
  job: string | null;
  role: string | null;
  payrolls: any;
  leaveRequests: any;
  attendances: any;
}

const columns: GridColDef[] = [
  { field: "employeeId", headerName: "Employee ID", width: 90 },
  { field: "firstName", headerName: "First Name", width: 150 },
  { field: "lastName", headerName: "Last Name", width: 150 },
  { field: "email", headerName: "Email", width: 250 },
  { field: "phone", headerName: "Phone", width: 150 },
  {
    field: "hireDate",
    headerName: "Hire Date",
    width: 180,
    type: "date",
    valueGetter: (params: any) => {
      if (params?.row?.hireDate) {
        return new Date(params.row.hireDate);
      }
      return null;
    }    
  },
  { field: "status", headerName: "Status", width: 120 },
  { field: "jobId", headerName: "Job ID", width: 100 },
  { field: "departmentName", headerName: "Department", width: 180 },
  { field: "roleId", headerName: "Role ID", width: 100 },
  {
    field: "job",
    headerName: "Job",
    width: 150,
    renderCell: (params: GridRenderCellParams) =>
      params.row.job ? params.row.job : "No Job Assigned",
  },
  {
    field: "payrolls",
    headerName: "Payrolls",
    width: 150,
    renderCell: (params: GridRenderCellParams) =>
      params.row.payrolls && params.row.payrolls.length > 0
        ? `Payrolls: ${params.row.payrolls.length}`
        : "No Payrolls",
},

  {
    field: "payrolls",
    headerName: "Payrolls",
    width: 150,
    renderCell: (params: GridRenderCellParams) =>
      params.row.payrolls ? "Available" : "Not Available",
  },
  {
    field: "leaveRequests",
    headerName: "Leave Requests",
    width: 180,
    renderCell: (params: GridRenderCellParams) =>
      params.row.leaveRequests ? "Has Leave Requests" : "No Leave Requests",
  },
  {
    field: "attendances",
    headerName: "Attendances",
    width: 180,
    renderCell: (params: GridRenderCellParams) =>
      params.row.attendances ? "Has Attendance Records" : "No Attendance Records",
  },
];

const Products = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<Employee[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    console.log("Fetching data...");
    fetch("https://localhost:7107/api/Employees")
      .then((res) => {
        console.log("Response received:", res);
        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log("Raw data:", data);
        if (Array.isArray(data) && data.length > 0) {
          console.log("Data fetched:", data);
          setData(data);
        } else {
          console.log("No data found");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error.message);
      });
  };
  

  return (
    <div className="products">
      <div className="info">
        <h1>Employees</h1>
        <button onClick={() => setOpen(true)}>Add New Employee</button>
      </div>
      <DataTable
        slug="products"
        columns={columns}
        rows={data || []}
        getRowId={(row) => row.employeeId}
      />
      {open && <Add slug="product" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Products;
