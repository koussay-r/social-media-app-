import React, { useEffect, useState } from 'react'
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { toast } from "react-hot-toast";
import axios from 'axios';
export default function ReactorsModal({handleOpenReactorsModal,openReactorsModal,id}) {
    const handleOpen=()=>{
        handleOpenReactorsModal()
    }
    const [reactorsArray,setReactorsArray]=useState([])
    const [postReactorsFetchingCount,setPostReactorsFetchingCount]=useState(0)
    useEffect(()=>{

        const handleGetPostReactors=async()=>{
            try {
                const response=await axios.post(`http://localhost:9000/posts/getReactors/${id}`,{postReactorsFetchingCount:postReactorsFetchingCount})
                setReactorsArray([...reactorsArray, response.data]);
              } catch (error) {
                console.log(error.message);
                toast.error("something went wrong!! try again")
                handleOpenReactorsModal()
            }
            console.log(reactorsArray)
          }
        handleGetPostReactors()
    },[postReactorsFetchingCount])
  return (
    <React.Fragment>
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={openReactorsModal}
      onClose={handleOpen}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Sheet
        variant="outlined"
        sx={{
          maxWidth: 500,
          borderRadius: 'md',
          p: 3,
          boxShadow: 'lg',
        }}
      >
        <ModalClose variant="plain" sx={{ m: 1 }} />
        <Typography
          component="h2"
          id="modal-title"
          level="h4"
          textColor="inherit"
          fontWeight="lg"
          mb={1}
        >
          This is the modal title
        </Typography>
        <Typography id="modal-desc" textColor="text.tertiary">
          Make sure to use <code>aria-labelledby</code> on the modal dialog with an
          optional <code>aria-describedby</code> attribute.
        </Typography>
      </Sheet>
    </Modal>
  </React.Fragment>
  )
}
