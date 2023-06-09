import { useState } from 'react';
import { Button, Center, Card, TextInput, Text, useMantineTheme, Divider } from '@mantine/core';
import { useForm } from '@mantine/form';
import { blake2AsHex } from '@polkadot/util-crypto';
import { useContract, useContractTx, useExtension } from 'useink';

import metadata from '../metadata/playground.json';
import { ADDRESS } from '../constants';

export const GiveMe = () => {
  const { account } = useExtension();
  const ctr = useContract(ADDRESS, metadata, 'AlephZeroTestnet');
  const contract = ctr?.contract;
  const registerTx = useContractTx(contract, 'giveMe');

  const [updateIsLoading, setUpdateIsLoading] = useState<boolean>();
  const form = useForm<{ name: string }>();
  const theme = useMantineTheme();

  const onSubmit = async () => {
    if (!account || !contract) {
      return;
    }
    setUpdateIsLoading(true);
    try {
      const name = form.values.name;

      await registerTx.signAndSend([name]);

      form.reset();
    } catch (e: any) {
      form.setFieldError('name', 'error');
    } finally {
      setUpdateIsLoading(false);
    }
  };

  if (!contract) return null;

  return (
    <Card shadow="sm" padding={theme.spacing.md}>
      <Text size="lg">Give me</Text>
      <Divider size="sm" my={20} />
      {!!account && (
        <form>
          <TextInput label="Name" disabled={updateIsLoading} {...form.getInputProps('name')} />
          <Divider size="sm" my={20} />
          <Button variant="outline" disabled={updateIsLoading} onClick={onSubmit} loading={updateIsLoading}>
            Register
          </Button>
        </form>
      )}
    </Card>
  );
};
