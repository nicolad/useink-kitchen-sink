import { useState } from 'react';
import { Button, Center, Card, TextInput, Text, useMantineTheme, Divider } from '@mantine/core';
import { useForm } from '@mantine/form';
import { blake2AsHex } from '@polkadot/util-crypto';
import { useContract, useContractTx, useExtension } from 'useink';

import metadata from '../metadata/playground.json';
import { ADDRESS } from '../constants';

export const Register = () => {
  const { account } = useExtension();
  const contract = useContract(ADDRESS, metadata);
  const registerTx = useContractTx(contract, 'register');

  const [updateIsLoading, setUpdateIsLoading] = useState<boolean>();
  const form = useForm<{ name: string }>();
  const theme = useMantineTheme();

  const register = async () => {
    if (!account || !contract) {
      return;
    }
    setUpdateIsLoading(true);
    try {
      const name = form.values.name;
      const hash = blake2AsHex(name);

      await registerTx.signAndSend([hash], { value: 0, gasLimit: 1000000000000 });

      form.reset();
    } catch (e: any) {
      if (e?.errorMessage?.includes('NameAlreadyExists')) {
        form.setFieldError('name', 'Name already exists');
        return;
      }
    } finally {
      setUpdateIsLoading(false);
    }
  };

  if (!contract) return null;

  return (
    <Card shadow="sm" padding={theme.spacing.md}>
      <Text size="lg">Register</Text>
      <Divider size="sm" my={20} />
      {!!account && (
        <form>
          <TextInput label="Name" disabled={updateIsLoading} {...form.getInputProps('name')} />
          <Divider size="sm" my={20} />
          <Button variant="outline" disabled={updateIsLoading} onClick={register} loading={updateIsLoading}>
            Register
          </Button>
        </form>
      )}
    </Card>
  );
};
