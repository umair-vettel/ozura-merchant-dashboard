import { useAccount, useConnect } from "wagmi";
import { useSignMessage } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";

import { Button } from "@/components/ui/button";
import { Web3Button } from "@web3modal/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
export const ConnectWallet = () => {
  const { connect } = useConnect();
  const { toast } = useToast();
  const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
    message: "Registration for Ozura",
  });
  const [btnDisabled, setBtnDisabled] = useState(false);
  const account = useAccount();
  const register = async () => {
    try {
      signMessage();
    } catch (err) {
      console.log(err);
    }
  };
  const onSuccess = async () => {
    try {
      setBtnDisabled(true);
      const path = `${process.env.NEXT_PUBLIC_API_URL}/users/register-merchant-using-web3`;
      const body = {
        signedMessage: data,
        walletAddress: account.address,
      };
      const res = await axios.post(path, body);
      console.log(res);
      if (res.status == 409) {
        toast({
          title: "User Already Exists",
          variant: "destructive",
        });
        setBtnDisabled(false);
        return;
      } else {
        toast({
          title: "New User Registered Sucessfully",
        });
        setTimeout(() => {
          window.open("/login", "_self");
        }, 2000);
      }
      console.log(res);
    } catch (err) {
      console.log(err);
      setBtnDisabled(false);
    }
  };
  useEffect(() => {
    if (isSuccess) {
      onSuccess();
    }
  }, [isSuccess]);
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        {/* <div>OR</div>
        <div>Register Using Web3</div>
        <br />
        <Web3Button /> */}
      </div>
      {account.isConnected ? (
        <Button
          variant="default"
          size={"full"}
          type="submit"
          onClick={() => {
            register();
          }}
          disabled={btnDisabled}
        >
          Register using {account.address?.slice(0, 4)}...
          {account.address?.slice(-4)}
        </Button>
      ) : (
        <></>
      )}
    </>
  );
};
