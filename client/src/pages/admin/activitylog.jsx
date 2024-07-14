import React, { useEffect, useState } from "react";
import { getAllActivityLogs, deleteActivityLog } from "../../middleware/activity.logging";
import SideBar from "@/components/layout/SideBar";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import { Toaster, toast } from "sonner";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const ActivityLog = () => {
  const [logs, setLogs] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [logToDelete, setLogToDelete] = useState(null);
  const [lastVisible, setLastVisible] = useState(null);
  const [pageSize] = useState(20);
  const [pageHistory, setPageHistory] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [emailFilter, setEmailFilter] = useState("");

  const fetchLogs = async (lastVisible = null, isNext = true, emailFilter = "") => {
    try {
      console.log("Calling fetchLogs with:", { lastVisible, isNext, emailFilter });

      const { logs: logsData, lastDoc } = await getAllActivityLogs(
        lastVisible,
        pageSize,
        emailFilter
      );
      console.log("Fetched logs:", logsData);
      setLogs(logsData);
      setLastVisible(lastDoc);
      if (isNext) {
        setPageHistory((prevHistory) => [...prevHistory, lastVisible]);
      } else {
        setPageHistory((prevHistory) => prevHistory.slice(0, -1));
      }
    } catch (error) {
      console.error("Error fetching activity logs:", error);
    }
  };

  useEffect(() => {
    fetchLogs(null, true, emailFilter);
  }, [emailFilter]);

  const handleDelete = async () => {
    toast.promise(deleteActivityLog(logToDelete), {
      loading: "Deleting activity log...",
      success: () => {
        setLogs(logs.filter((log) => log.id !== logToDelete));
        setIsDeleteModalOpen(false);
        setLogToDelete(null);
        return "Activity log deleted successfully";
      },
      error: (err) => {
        console.error("Error deleting activity log:", err);
        setIsDeleteModalOpen(false);
        setLogToDelete(null);
        return `Failed to delete activity log. Please try again. ${err.message}`;
      },
    });
  };

  const openDeleteModal = (logId) => {
    setLogToDelete(logId);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setLogToDelete(null);
  };

  const handleNextPage = () => {
    fetchLogs(lastVisible, true, emailFilter);
  };

  const handlePreviousPage = () => {
    if (pageHistory.length > 1) {
      const previousLastVisible = pageHistory[pageHistory.length - 2];
      fetchLogs(previousLastVisible, false, emailFilter);
    } else {
      fetchLogs(null, false, emailFilter);
    }
  };

  const columns = [
    {
      accessorKey: "firstname",
      header: "First Name",
    },
    {
      accessorKey: "lastname",
      header: "Last Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "action",
      header: "Action",
    },
    {
      accessorKey: "details",
      header: "Details",
      cell: ({ row }) => {
        const details = row.original.details;
        return details && (details.folderName || details.fileName) ? (
          <>
            {details.folderName && <div>{details.folderName}</div>}
            {details.fileName && <div>{details.fileName}</div>}
          </>
        ) : (
          "No details"
        );
      },
    },
    {
      accessorKey: "timestamp",
      header: "Date",
      cell: ({ row }) => {
        const timestamp = row.original.timestamp
          ? new Date(row.original.timestamp.seconds * 1000)
          : null;
        return timestamp ? timestamp.toLocaleDateString() : "No date";
      },
    },
    {
      id: "actions",
      header: "Delete",
      cell: ({ row }) => (
        <button onClick={() => openDeleteModal(row.original.id)}>
          <Trash2 className="w-4 h-4 text-red-500 hover:text-red-700" />
        </button>
      ),
    },
  ];

  const table = useReactTable({
    data: logs,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="flex w-full h-screen">
      <SideBar />
      <div className="container mx-auto p-5">
        <h1 className="text-2xl font-bold mb-4">Activity Logs</h1>
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter emails..."
            value={emailFilter}
            onChange={(event) => {
              console.log("Email filter changed to:", event.target.value);
              setEmailFilter(event.target.value);
            }}
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="overflow-x-auto h-96">
          <Toaster richColors />
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between px-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePreviousPage}
              disabled={pageHistory.length <= 1}
            >
              Previous
            </Button>
            <Button variant="outline" size="sm" onClick={handleNextPage} disabled={!lastVisible}>
              Next
            </Button>
          </div>
        </div>
      </div>

      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-gray-300 p-8 rounded-lg shadow-2xl">
            <h2 className="text-xl font-semibold mb-6">Delete Activity Log</h2>
            <p className="mb-4">Are you sure you want to delete this activity log?</p>
            <div className="flex justify-end space-x-4">
              <Button
                onClick={handleDelete}
                className="px-6 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                Yes
              </Button>
              <Button
                onClick={closeDeleteModal}
                className="px-6 py-2 border bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityLog;
