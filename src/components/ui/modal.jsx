import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"

export const Modal = ({children , title , open , handleOpenCheckout , fullWidth , maxWidth , actions , showTitle=true , background=''})=>{
    return(
        <Dialog
          open={open}
          onClose={handleOpenCheckout}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth={fullWidth}
          maxWidth={maxWidth}
         

        >
            {
                showTitle &&
                    <DialogTitle>
                    {title}
                    </DialogTitle>

            }
            <DialogContent id="alert-dialog-description" className={`${background ? background : ''}`}>
             {children}
            </DialogContent>
            {
                actions &&
                <DialogActions>
                   <button onClick={handleClose}>Cancelar</button>
                    <button onClick={handleClose}>Guardar</button>
                </DialogActions>
            }
        </Dialog>
    )
}