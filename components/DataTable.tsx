import { Table, Thead, Tbody, Tr, Th, Td, Input, Button, Box, Flex,Spinner,Stack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

interface DataTableProps {
  sortable?: boolean;
  searchable?: boolean;
  paginated?: boolean;
  caption?: string;
  headers: string[];
}

interface TableRow {
  [key: string]: string | number;
}

const DataTable: React.FC<DataTableProps> = ({ sortable, searchable, paginated, headers }) => {
  const [data, setData] = useState<TableRow[]>([]);
  const [loading,setLoading]= useState<boolean>(false)
  const [filteredData, setFilteredData] = useState<TableRow[]>([]);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  console.log("filteredData",filteredData)

  useEffect(() => {
    setLoading(true)
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false)
        setFilteredData(data);
      });
  }, []);

  useEffect(() => {
    // Filter data based on the search term
    if (searchable) {
      const filtered = data.filter(row =>
        Object.values(row).some(value => {
          if (typeof value === 'string') {
            return value.toLowerCase().includes(searchTerm.toLowerCase());
          }
          return false;
        })
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [data, searchTerm, searchable]);

  const handleSortByColumn = (column: string) => {
    if (sortable) {
      if (sortBy === column) {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
      } else {
        setSortBy(column);
        setSortOrder('asc');
      }
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const sortedData = sortable
    ? filteredData.slice().sort((a, b) => {
        const valueA = a[sortBy!] as string | number;
        const valueB = b[sortBy!] as string | number;
        if (valueA < valueB) {
          return sortOrder === 'asc' ? -1 : 1;
        }
        if (valueA > valueB) {
          return sortOrder === 'asc' ? 1 : -1;
        }
        return 0;
      })
    : filteredData;

  const paginatedData = paginated
    ? sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : sortedData;

  return (
    <>
    {loading? 
      <Stack direction='row' spacing={4} 
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      padding={"20px"}
      minHeight={"80vh"}>
     <Spinner
  thickness='4px'
  speed='0.65s'
  emptyColor='gray.200'
  color='blue.500'
  size='xl'
/></Stack>
      :
    <Box padding={"20px"}>
      
      {searchable && (
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search"
          my={2}
        />
      )}
        {filteredData.length!==0?
    <div>
      <Table variant="simple">
        <Thead>
          <Tr>
            {headers.map((header, index) => (
              <Th key={index} onClick={() => handleSortByColumn(header)}>
                {header}
              </Th>
            ))}
          </Tr>
        </Thead>
   <Tbody>
          {paginatedData.map((row, index) => (
            <Tr key={index}>
              {headers.map((header, headerIndex) => (
                <Td key={headerIndex}>{row[header]}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
      {paginated &&filteredData.length!==0&& (
        <Flex justifyContent="center" my={2}>
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            mx={1}
          >
            Previous
          </Button>
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage * itemsPerPage >= filteredData.length}
            mx={1}
          >
            Next
          </Button>
        </Flex>
      )}</div>
      :
      <div style={{display:"flex",justifyContent:'center',fontSize:"20px",minHeight:"60vh",alignItems:"center"}}
      >
        <Box>There is no data present in table</Box></div>
      }
    
    </Box>}
    </>
 
  );
};

export default DataTable;
