import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import { Button } from "@/components/ui/button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useEffect } from "react";
import axios from "axios";
import { RxCopy } from "react-icons/rx";
import { Alert, Portal, Snackbar } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function WithdrawFunds() {
  const [open, setOpen] = React.useState(false);

  const [withdrawAmountinUSD, setwithdrawAmountinUSD] = useState("");
  const [currency, setcurrency] = useState("ETH");
  const [withdrawalAddress, setwithdrawalAddress] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [withdrawalDone, setwithdrawalDone] = useState(false);
  const [withdrawalTxnHash, setwithdrawalTxnHash] = useState("");
  const [iframeURL, setiframeURL] = useState("");
  const [snackbaropen, setSnackbaropen] = useState(false);
  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbaropen(false);
  };

  const copy = (link: string) => {
    navigator.clipboard.writeText(link);
    setSnackbaropen(true);
  };
  const handleSubmit = async (e: Event) => {
    setLoading(true);
    e.preventDefault();
    try {
      const user = localStorage.getItem("user") || "";
      const token = JSON.parse(user).token;
      const path = `${process.env.NEXT_PUBLIC_API_URL}/payments/requestWithdrawal`;
      const body = {
        amount:
          currency == "ETH"
            ? Number(withdrawAmountinUSD) * 10 ** 18
            : Number(withdrawAmountinUSD) * 10 ** 6,
        token: currency,
        address: withdrawalAddress,
      };
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const res = await axios.post(path, body, { headers });
      setMessage(
        "Withdarwal Requested Successfully with Txn Hash: " +
          res?.data?.trx?.transactionHash,
      );
      setwithdrawalDone(true);
      setwithdrawalTxnHash(res?.data?.trx?.transactionHash);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleOpen = () => {
    setwithdrawalDone(false);
    setwithdrawalTxnHash("");
    setLoading(false);
    setwithdrawAmountinUSD("");
    setwithdrawalAddress("");
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  return (
    <>
      <div>
        <Button variant="default" size={"full"} onClick={handleOpen}>
          Withdraw
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={style}
            style={{
              backgroundColor: "#2f2b3b",
              borderRadius: "1rem",
              borderColor: "#2f2b3b",
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h5"
              component="h2"
              color={"#fff"}
              mb={2}
              fontWeight={"bold"}
            >
              Withdraw Funds
            </Typography>
            <form className="space-y-5" onSubmit={(e: any) => handleSubmit(e)}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-200"
                >
                  Select Currency
                </label>
                <select
                  // type="text"
                  // id="email"
                  // autoComplete="off"
                  value={currency}
                  onChange={(e) => setcurrency(e.target.value)}
                  className="shadow-sm bg-sidebar-purple bg-opacity-50 border-gray-500 border-2 text-gray-200 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                  placeholder="Select Currency"
                  required
                >
                  <option value="USDT">USDT</option>
                  {/*                 <option value="MATIC">MATIC</option>
                   */}
                  <option value="ETH">ETH</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-200"
                >
                  Withdraw Amount
                </label>
                <input
                  type="text"
                  id="email"
                  autoComplete="off"
                  value={withdrawAmountinUSD}
                  onChange={(e) => setwithdrawAmountinUSD(e.target.value)}
                  className="shadow-sm bg-sidebar-purple bg-opacity-50 border-gray-500 border-2 text-gray-200 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                  placeholder="Enter the Amount"
                  required
                />
              </div>

              {/* <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              color={"#fff"}
              mb={2}
              fontSize={"15px"}
              fontWeight={"400"}
            >
              Amount Value in ETH:{" "}
              <span style={{ fontWeight: 700 }}>25 ETH</span>
            </Typography> */}
              <div>
                <label
                  htmlFor="subject"
                  className="block mb-2 text-sm font-medium text-gray-200"
                >
                  Wallet Address for Withdrawal
                </label>
                <input
                  type="text"
                  id="subject"
                  autoComplete="off"
                  value={withdrawalAddress}
                  onChange={(e) => setwithdrawalAddress(e.target.value)}
                  className="shadow-sm bg-sidebar-purple bg-opacity-50 border-gray-500 border-2 text-gray-200 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                  placeholder="Enter the receiver's wallet address"
                  required
                />
              </div>

              <div className="flex justify-center md:justify-start">
                <Button type="submit" size={"full"}>
                  Withdraw
                </Button>
              </div>
            </form>
          </Box>
        </Modal>
      </div>
      {loading ? (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={style}
            style={{
              backgroundColor: "#2f2b3b",
              borderRadius: "1rem",
              borderColor: "#2f2b3b",
              textAlign: "center",
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h5"
              component="h2"
              color={"#fff"}
              mb={2}
              fontWeight={"bold"}
            >
              Processing Withdrawal
            </Typography>
            <Typography
              variant="h6"
              component="h2"
              color={"#fff"}
              mb={2}
              fontWeight={"bold"}
              fontSize={"18px"}
            >
              Kindly Wait while we process your withdrawal request
            </Typography>
          </Box>
        </Modal>
      ) : (
        <></>
      )}
      {withdrawalDone ? (
        <>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={style}
              style={{
                backgroundColor: "#2f2b3b",
                borderRadius: "1rem",
                borderColor: "#2f2b3b",
                textAlign: "center",
              }}
            >
              <Typography
                id="modal-modal-title"
                variant="h5"
                component="h2"
                color={"#fff"}
                mb={2}
                fontWeight={"bold"}
              >
                Withdrawal Successful
              </Typography>
              <Typography
                variant="h6"
                component="h2"
                color={"#fff"}
                mb={2}
                fontWeight={"bold"}
                fontSize={"18px"}
              >
                Your withdrawal has been processed successfully
              </Typography>
              <div
                className="flex align-end gap-2 justify-center cursor-pointer"
                onClick={() => copy(withdrawalTxnHash)}
                style={{ color: "#fff", alignItems: "center" }}
              >
                <a
                  href={`https://mumbai.polygonscan.com/tx/${withdrawalTxnHash}`}
                  target="_blank"
                >
                  <span className="text-sm text-gray-400">
                    Click to view on Block Explorer
                  </span>
                </a>
                <RxCopy />
              </div>
            </Box>
          </Modal>
          <Portal>
            <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              open={snackbaropen}
              onClose={handleCloseSnackbar}
              message="Link Copied"
              autoHideDuration={1000}
              style={{ zIndex: 999999, background: "green" }}
            >
              <Alert
                onClose={handleCloseSnackbar}
                severity="success"
                sx={{ width: "100%" }}
              >
                Link Copied
              </Alert>
            </Snackbar>
          </Portal>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
