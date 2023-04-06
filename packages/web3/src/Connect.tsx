import React from "react";
import { Button } from "@mantine/core";
import { useExtension } from "useink";

export const Connect = () => {
  const { account, connect, disconnect } = useExtension();

  return !account ? (
    <Button onClick={connect}>Connect Wallet</Button>
  ) : (
    <Button onClick={disconnect}>Disconnect Wallet</Button>
  );
};
