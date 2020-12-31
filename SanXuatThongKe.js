import './SanXuatThongKe.css';

import { Box, Card, CardContent, CssBaseline, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, FormLabel, TextField } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import React, { useEffect, useState } from "react";

import ApiHelper from "../../services/api-helper";
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import { Fragment } from 'react';
import Icon from '@material-ui/core/Icon';
import MUIDataTable from "mui-datatables";
import Moment from 'react-moment';
import WithTitle from '../Helper/WithTitle/WithTitle';
import { useHistory } from 'react-router-dom';

function SanXuatThongKe() {
  const [danhSachThongKeCongViec, setdanhSachThongKeCongViec] = useState([]);
  const [open, setOpen] = React.useState(false);
  const history = useHistory();
  const navigateToDetails = (maPhieu) => {
    history.push({ pathname: '/chi-tiet-san-xuat-thong-ke',
    //  search: '?MaPhieu=' + maPhieu,
     state:{MaPhieu:maPhieu} 
    });
  };
  useEffect(() => {
    getDanhSachThongKeCongViec();
  }, [null]);
  const getMuiTheme = () => createMuiTheme({
    overrides: {
      MUIDataTableHeadCell: {
        fixedHeader: {
          backgroundColor: '#03c369',
          color:'white',
          fontWeight:'bold'
        }
      },
      MUIDataTableSelectCell: {
        bodyCell: {
          backgroundColor: '#03c369',
          color:'white',
          fontWeight:'bold'
        }
      }
    }
  });

  const columns = [
    {
      name: "STT",
      label: "STT",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => (
          tableMeta.rowIndex + 1
        )
      }
    },
    {
      name: "SoPhieu",
      label: "Số phiếu",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "NgayLap",
      label: "Ngày lập",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => (
          <Moment format="DD/MM/YYYY">{value}</Moment>
        )
      }
    },
    {
      name: "NoiDung",
      label: "Nội dung",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: 'MaPhieu',
      label: "Thao tác",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => (
          <div>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Icon>visibility</Icon>}
              onClick={() => navigateToDetails(value)}
            >
              Chi tiết
          </Button>
          </div>
        )
      }
    },
  ];

  const options = {
    filter: true,
    print: false,
    viewColumns: true,
    selectableRows: "single",
    responsive: "standard",
    download: false,
    setRowProps: (row, dataIndex) => ({
      onDoubleClick: () => {
        let maPhieu = danhSachThongKeCongViec[dataIndex] && danhSachThongKeCongViec[dataIndex].MaPhieu;
        navigateToDetails(maPhieu);
      }
    }),
    rowHover: true,
    selectableRowsOnClick: false,
    resizableColumns: true
  };
  const getDanhSachThongKeCongViec = () => {
    ApiHelper.Get("api/ThongKeCongViec/GetDanhSachThongKeCongViec")
      .then(response => response.json()).then(result => {
        if (result.ok === true) {
          setdanhSachThongKeCongViec(result.data);
        } else {
          setdanhSachThongKeCongViec([]);
        }
      });
  }

  const ThemMoiSanXuatThongKeDialog = (props) => {
    const { onClose, open, title, content } = props;
    return (
      <Dialog open={open} onClose={onClose} aria-labelledby="">
        <DialogTitle id="">{title}</DialogTitle>
        <DialogContent>
          {content}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="default">
            Huỷ
        </Button>
          <Button onClick={onClose} color="primary">
            Lưu
        </Button>
        </DialogActions>
      </Dialog>
    );
  }
  // const handleMoThemMoiSanXuatThongKe = () => {
  //   setOpen(true);
  // }

  // const handleDongThemMoiSanXuatThongKe = () => {
  //   setOpen(false);
  // }
  return (
    <MuiThemeProvider theme={getMuiTheme()}>
      <Fragment>
        <CssBaseline>
          <Container>
            {/* <Box my={1} p={0}>
              <Card>
                <Box>
                  <CardContent>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<Icon>add</Icon>}
                      onClick={() => handleMoThemMoiSanXuatThongKe()}
                    >
                      Thêm mới
                   </Button>
                    <ThemMoiSanXuatThongKeDialog
                      open={open}
                      onClose={handleDongThemMoiSanXuatThongKe}
                      title={"Thêm mới sản xuất thống kê"}
                      content={
                        <FormControl>
                          <FormLabel></FormLabel>
                          <Container>
                            <TextField
                              id="SoPhieu"
                              label="Số phiếu"
                              value={""}
                              required={true}
                              variant='outlined'
                            />
                            <TextField
                              id="date"
                              label="Birthday"
                              type="date"
                              defaultValue="2017-05-24"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              required={true}
                              variant='outlined'
                            />
                            <TextField
                              id="NoiDung"
                              label="Nội dung"
                              value={""}
                              required={true}
                              variant='outlined'
                            />
                          </Container>
                          <FormHelperText></FormHelperText>
                        </FormControl>
                      }
                    >

                    </ThemMoiSanXuatThongKeDialog>
                  </CardContent>
                </Box>
              </Card>
            </Box> */}
            <Box my={1}>
              <MUIDataTable
                title={"Sản xuất thống kê"}
                data={danhSachThongKeCongViec}
                columns={columns}
                options={options}
              >
              </MUIDataTable>
            </Box>
          </Container>
        </CssBaseline>
      </Fragment>
    </MuiThemeProvider>
  );
}

export default WithTitle({ component: SanXuatThongKe, title: "Sản xuất thống kê" });
