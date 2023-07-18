"use client"
import { Box } from '@chakra-ui/react';
import DataTable from "@/components/DataTable"

export default function BookingPage() {
  // const headers = ['Timestamp', 'Purchase Id', 'Mail', 'Name', 'Source', 'Status', 'Select'];
  const headers = ['userId', 'id', 'title', 'body'];
 
  return (
    <>
     <Box>
     <Box>
      <DataTable sortable searchable paginated headers={headers} />
    </Box>
    </Box>
    </>
  )
}



