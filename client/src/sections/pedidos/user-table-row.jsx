/* eslint-disable import/no-unresolved */
import React from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

export default function UserTableRow({
  selected,
  prenda,
  imagen,
  usuario,
  fecha,
  metodo,
  estado,
  precio,
  cantidad,
  status,
  handleClick,
}) {
  const [open, setOpen] = React.useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleEditClick = () => {
    console.log('Editar', prenda);
    handleCloseMenu();
  };

  const handleDeleteClick = () => {
    console.log('Eliminar', prenda);
    handleCloseMenu();
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={prenda} src={imagen} />
            <Typography variant="subtitle2" noWrap>
              {prenda}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{usuario}</TableCell>
        <TableCell>{fecha}</TableCell>
        <TableCell>{metodo}</TableCell>

        <TableCell>{estado}</TableCell>

        <TableCell align="center">{cantidad}</TableCell>

        <TableCell>{precio}</TableCell>

        <TableCell>
          <Label color={(status === 'banned' && 'error') || 'success'}>{status}</Label>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleEditClick}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleDeleteClick}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  prenda: PropTypes.any,
  usuario: PropTypes.any,
  fecha: PropTypes.any,
  metodo: PropTypes.any,
  estado: PropTypes.any,
  precio: PropTypes.any, // Agrega esta línea
  cantidad: PropTypes.any,
  selected: PropTypes.any,
  status: PropTypes.string,
  handleClick: PropTypes.func,
  imagen: PropTypes.func,
};
