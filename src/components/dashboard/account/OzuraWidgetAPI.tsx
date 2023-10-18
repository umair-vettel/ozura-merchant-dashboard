import React from "react";
import { Separator } from "../../ui/separator";
import { Button } from "../../ui/button";

type Props = {};

const OzuraWidgetAPI = (props: Props) => {
  return (
    <div>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Generate API Key</h3>
          <p className="text-sm text-muted-foreground">
            Do not share the API keys with anyone.
          </p>
          <Button variant="default" className="mt-4">
            Generate API Key
          </Button>

          <p className="text-sm text-muted-foreground mt-4">
            zaCELgL0imfnc8mVLWwsAawjYr4Rx-Af50DDqtlx
          </p>
        </div>
        <Separator />
        <div>
          <h3 className="text-lg font-medium">Documentation</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Follow the steps below to use the Ozura Widget API:
          </p>
          <ol className="space-y-3 max-w-[1024px] !list-disc ml-3">
            <li>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore
              soluta doloremque rerum dicta maiores cupiditate autem ut aliquam
              ea nostrum temporibus sit, nihil praesentium eos id molestias vero
              libero quo.
            </li>
            <li>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum
              magnam ex fuga, asperiores repudiandae id?
            </li>
            <li>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem,
              inventore?
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default OzuraWidgetAPI;
