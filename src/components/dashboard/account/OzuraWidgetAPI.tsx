import React, { useEffect, useState } from "react";
import { Separator } from "../../ui/separator";
import { Button } from "../../ui/button";
import axios from "axios";
import { Copy } from "lucide-react";
import { AuthPost } from "@/services/apiService";
import { toast } from "@/components/ui/use-toast";
type Props = {};

const OzuraWidgetAPI = (props: Props) => {
  const [apiKey, setApiKey] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const getAPIKey = async () => {
    try {
      const path = `${process.env.NEXT_PUBLIC_API_URL}/users/getAPIKey`;
      const res = await AuthPost(path, {});
      if (res.status == 200) {
        console.log(res.data);
        const { apiKey } = res.data.data;
        setApiKey(apiKey);
        setLoading(false);
        return;
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getAPIKey();
  }, []);

  const generateAPIKey = async () => {
    try {
      setLoading(true);
      const path = `${process.env.NEXT_PUBLIC_API_URL}/users/createAPIKey`;
      const res = await AuthPost(path, {});
      if (res.status == 200) {
        console.log(res.data);
        const { apiKey } = res.data.data;
        setApiKey(apiKey);
        setLoading(false);
        return;
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const copyToClipboard = (link: string) => {
    navigator.clipboard.writeText(link);
    toast({
      variant: "success",
      title: `API Key copied to clipboard!`,
    });
  };

  const copyEndpointToClipboard = (link: string) => {
    navigator.clipboard.writeText(link);
    toast({
      variant: "success",
      title: `Endpoint copied to clipboard!`,
    });
  };

  return (
    <div>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Generate API Key</h3>
          <p className="text-sm text-muted-foreground">
            Do not share the API keys with anyone.
          </p>
          {loading ? (
            <p className="text-sm text-muted-foreground mt-4">Loading... </p>
          ) : !loading && apiKey === "" ? (
            <Button
              variant="default"
              className="mt-4"
              disabled={loading}
              onClick={generateAPIKey}
            >
              Generate API Key
            </Button>
          ) : (
            <>
              <div
                onClick={() => copyToClipboard(apiKey)}
                className="flex text-sm gap-2 cursor-pointer flex-wrap pt-2"
              >
                <div className="break-words block ellipsis1">{apiKey}</div>
                <Copy size={15} />
              </div>
            </>
          )}
        </div>
        <Separator />
        <div>
          <h3 className="text-lg font-medium">Documentation</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Follow the steps below to use the Ozura Widget API:
          </p>
          <ol className="space-y-3 max-w-[1024px] !list-disc ml-3">
            <li>
              Use this endpoint to make requests:{" "}
              <span
                onClick={() =>
                  copyEndpointToClipboard(
                    "https://ozura.vetteltechnologies.com/widgets/api",
                  )
                }
                className="flex text-sm gap-2 cursor-pointer flex-wrap pt-2"
              >
                <div className="break-words block ellipsis1">
                  https://ozura.vetteltechnologies.com/widgets/api
                </div>
                <Copy size={15} />
              </span>
            </li>
            <li>Pass the API Key in the request headers as apiKey</li>
            <li>
              In the request body, pass the following parameters as JSON:
              {/* write code as code style */}
              <span className="block text-sm text-muted-foreground mt-2">
                "productName": Name of the product,
                <br /> "productPrice": Price of the product (Null if any amount
                can be accepted),
                <br /> "merchantProcessingFees": Processing Fees,
                <br />
                "imageUrl": URL of image of the product (Null if no image is
                available),
              </span>
            </li>

            <li>
              In the response, you will get an widget URL which you can use to
              accept the payments.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default OzuraWidgetAPI;
