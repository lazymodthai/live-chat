import { Grid2 } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <Grid2 container display={'flex'} justifyContent={'center'} sx={{overflowX: 'hidden'}} width={'100vw'}>
      <Outlet />
    </Grid2>
  );
}
