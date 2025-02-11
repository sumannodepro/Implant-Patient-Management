import React, { useState } from 'react';
import PropTypes from 'prop-types';

import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Search from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import { getTagFromKey } from 'dwv';

const TagsTable = ({ data }) => {
  const [searchFor, setSearchFor] = useState('');
  const [instanceNumber, setInstanceNumber] = useState(0);
  const [displayData, setDisplayData] = useState([]);

  const fullMetaData = data;

  const filterList = (search, instanceNumber) => {
    const searchLo = search.toLowerCase();
    const metaArray = getMetaArray(instanceNumber);
    const updatedList = metaArray.filter((item) => {
      return Object.values(item).some((value) => 
        value?.toString().toLowerCase().includes(searchLo)
      );
    });

    setSearchFor(search);
    setDisplayData(updatedList);
  };

  const getMetaArray = (instanceNumber) => {
    const reducer = isDicomMeta(fullMetaData)
      ? getDicomTagReducer(fullMetaData, instanceNumber, '')
      : getTagReducer(fullMetaData);

    return Object.keys(fullMetaData).reduce(reducer, []);
  };

  const isDicomMeta = (meta) => typeof meta['00020010'] !== 'undefined';

  const getTagReducer = (tagData) => (acc, key) => {
    acc.push({ name: key, value: tagData[key]?.value });
    return acc;
  };

  const getDicomTagReducer = (tagData, instanceNumber, prefix) => (acc, key) => {
    const tag = getTagFromKey(key);
    const element = tagData[key];
    let value = element.value;
    if (typeof value.slice === 'undefined' && value[instanceNumber]) {
      value = value[instanceNumber];
    }
    acc.push({ name: prefix ? `${prefix} ${tag.getKey()}` : tag.getKey(), value });
    return acc;
  };

  return (
    <Box sx={{ padding: 2, overflow: 'hidden' }}>
      <Stack direction="row" spacing={2}>
        <TextField
          id="search"
          type="search"
          value={searchFor}
          onChange={(e) => filterList(e.target.value, instanceNumber)}
          margin="normal"
          size="small"
          sx={{ width: '45%' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <Box sx={{ width: 300, display: 'flex', alignItems: 'center' }}>
          <Slider
            title="Instance number"
            sx={{ margin: 2 }}
            marks
            min={0}
            max={10}
            onChange={(e) => setInstanceNumber(Number(e.target.value))}
          />
          <div>{instanceNumber}</div>
        </Box>
      </Stack>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 400 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Tag</TableCell>
                <TableCell>Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

TagsTable.propTypes = {
  data: PropTypes.object.isRequired,
};

export default TagsTable;
