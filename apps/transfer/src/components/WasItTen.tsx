import { useState } from 'react';
import { Button, Card, Text, TextInput, useMantineTheme, Divider } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useContract, useContractTx, useExtension } from 'useink';
import metadata from '../metadata/playground.json';
import { ADDRESS } from '../constants';

export const WasItTen = () => {
  const { account } = useExtension();
  const ctr = useContract(ADDRESS, metadata, 'AlephZeroTestnet');
  const contract = ctr?.contract;
  const wasItTenTx = useContractTx(contract, 'wasItTen');
  const [sendValueIsLoading, setSendValueIsLoading] = useState<boolean>();
  const form = useForm<{ value: number }>({
    initialValues: {
      value: 10,
    },
  });
  const theme = useMantineTheme();

  const onSubmit = async () => {
    if (!account || !contract) {
      return;
    }
    setSendValueIsLoading(true);

    try {
      const value = form.values.value;

      const result = await wasItTenTx.signAndSend([], {
        value: value,
      });
    } catch (e: any) {
      form.setFieldError('value', "The value wasn't 10");
    } finally {
      setSendValueIsLoading(false);
    }
  };

  if (!contract) return null;

  return (
    <Card shadow="sm" padding={theme.spacing.md}>
      <Text size="lg">Was it ten</Text>
      {!!account && (
        <form>
          <TextInput
            type="number"
            min={0}
            label="Value"
            disabled={sendValueIsLoading}
            {...form.getInputProps('value')}
          />
          <Divider size="sm" my={20} />
          <Button variant="outline" disabled={sendValueIsLoading} onClick={onSubmit} loading={sendValueIsLoading}>
            Send Tokens
          </Button>
        </form>
      )}
    </Card>
  );
};
