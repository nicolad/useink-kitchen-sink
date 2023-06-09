import { useEffect } from 'react';
import {
  useBlockHeader,
  useCall,
  useCallSubscription,
  useContract,
  useContractTx,
  useExtension,
  shouldDisable,
  useBalance,
  decodeError,
  useDryRun,
  useTxPaymentInfo,
} from 'useink';

import { Connect } from 'web3';

import { ADDRESS } from '../constants';
import metadata from '../metadata/playground.json';

import { GiveMe } from './GiveMe';
import { WasItTen } from './WasItTen';

type MoodResult = { Ok?: { mood: string }; Err?: { BadMood: { mood: string } } };

export const HomePage: React.FC = () => {
  const { account } = useExtension();
  const block = useBlockHeader('AlephZeroTestnet');
  const balance = useBalance(account);
  const alephContract = useContract(ADDRESS, metadata, 'AlephZeroTestnet');

  const contract = alephContract?.contract;

  const get = useCall<boolean>(contract, 'get');
  const flipTx = useContractTx(alephContract?.contract, 'flip');
  const flipDryRun = useDryRun(contract, 'flip');
  const flipPaymentInfo = useTxPaymentInfo(contract, 'flip');
  const panic = useCall<boolean>(contract, 'panic');
  const assertBoom = useCall<boolean>(contract, 'assertBoom');
  const mood = useCall<MoodResult>(contract, 'mood');

  useEffect(() => {
    console.log(mood?.result?.ok && mood.result?.value?.decoded.Ok);
  }, [mood.result]);

  if (!contract) {
    return (
      <div className="justify-center h-screen flex items-center w-full">
        <h1 className="text-3xl font-bold">Loading contract...</h1>
      </div>
    );
  }

  return (
    <section className="w-full mx-auto">
      <div className="max-w-3xl w-full mx-auto py-16 px-4">
        <h1 className="text-5xl font-bold text-blue-500">useink Kitchen Sink</h1>
        <div className="mt-8">
          <Connect />
          <GiveMe />
          <WasItTen />
          {account && (
            <ul className="list-none flex flex-col gap-12">
              <li>
                <b>You are connected as:</b>
                <span className="ml-4 dark:bg-slate-600 bg-slate-200 rounded-lg py-2 px-2">{account.address}</span>
              </li>

              <li>
                <b>Your Free Balance:</b>
                <span className="ml-4 dark:bg-slate-600 bg-slate-200 rounded-lg py-2 px-2">
                  {balance?.freeBalance.toString()}
                </span>
              </li>

              <li>
                <b>Current Block:</b>
                <span className="ml-4 dark:bg-slate-600 bg-slate-200 rounded-lg py-2 px-2">
                  {block?.blockNumber === undefined ? '--' : block.blockNumber}
                </span>
              </li>

              <li className="flex items-center gap-4">
                <button
                  onClick={() => get.send()}
                  disabled={get.isSubmitting}
                  className="rounded-2xl text-white px-6 py-4 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 hover:disabled:bg-blue-300 transition duration-75"
                >
                  Call get()
                </button>

                <h3 className="text-xl">Value: {get.result?.ok ? get.result.value.decoded.toString() : '--'}</h3>
              </li>

              <li className="flex flex-col gap-4">
                <button
                  onClick={() => flipTx.signAndSend()}
                  disabled={shouldDisable(flipTx)}
                  className="rounded-2xl text-white px-6 py-4 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 hover:disabled:bg-blue-300 transition duration-75"
                >
                  {shouldDisable(flipTx) ? 'Flipping' : 'Flip!'}
                </button>

                <h3 className="text-xl">
                  <b>Status:</b> {flipTx.status}
                </h3>

                <button
                  onClick={() => flipTx.resetState()}
                  disabled={shouldDisable(flipTx) || ['InBlock', 'None'].includes(flipTx.status)}
                  className="rounded-2xl text-white px-6 py-4 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 hover:disabled:bg-blue-300 transition duration-75"
                >
                  Reset state
                </button>
              </li>

              <li className="flex flex-col gap-4">
                <button
                  onClick={() => flipDryRun.send()}
                  disabled={flipDryRun.isSubmitting}
                  className="rounded-2xl text-white px-6 py-4 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 hover:disabled:bg-blue-300 transition duration-75"
                >
                  {flipDryRun.isSubmitting ? 'Flipping' : 'Flip as Dry Run!'}
                </button>

                <h3 className="text-xl">
                  <b>Gas Required:</b>{' '}
                  {flipDryRun.result?.ok
                    ? flipDryRun.result.value.partialFee.toString()
                    : (flipDryRun.result?.error && decodeError(flipDryRun.result, contract).message) || '--'}
                </h3>
              </li>

              <li className="flex flex-col gap-4">
                <button
                  onClick={() => flipPaymentInfo.send()}
                  disabled={flipPaymentInfo.isSubmitting}
                  className="rounded-2xl text-white px-6 py-4 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 hover:disabled:bg-blue-300 transition duration-75"
                >
                  {flipPaymentInfo.isSubmitting ? 'Getting payment info...' : 'Get payment info for flip'}
                </button>

                <h3 className="text-xl">
                  <b>Partial Fee (a.k.a. Gas Required):</b>{' '}
                  {flipPaymentInfo.result ? flipPaymentInfo.result?.partialFee.toString() : '--'}
                </h3>
              </li>

              <li className="flex flex-col gap-4">
                <button
                  onClick={() => panic.send()}
                  disabled={panic.isSubmitting}
                  className="rounded-2xl text-white px-6 py-4 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 hover:disabled:bg-blue-300 transition duration-75"
                >
                  Call panic()
                </button>

                <h3 className="text-xl">
                  {panic.result && !panic.result.ok
                    ? decodeError(panic.result, contract, {
                        ContractTrapped: 'This is a custom message. There was a panic in the contract!',
                      }).message
                    : '--'}
                </h3>
              </li>

              <li className="flex flex-col gap-4">
                <button
                  onClick={() => assertBoom.send()}
                  disabled={assertBoom.isSubmitting}
                  className="rounded-2xl text-white px-6 py-4 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 hover:disabled:bg-blue-300 transition duration-75"
                >
                  Call assertBoom()
                </button>

                <h3 className="text-xl">
                  {assertBoom.result && !assertBoom.result.ok
                    ? decodeError(assertBoom.result, contract, {
                        ContractTrapped: 'This is a custom message. The assertion failed!',
                      }).message
                    : '--'}
                </h3>
              </li>

              <li className="flex flex-col gap-4">
                <h3 className="text-xl">
                  Handle Results. An even number will return an Ok Result, and an odd number will return an Error
                </h3>
                <button
                  onClick={() => mood.send([0])}
                  disabled={mood.isSubmitting}
                  className="rounded-2xl text-white px-6 py-4 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 hover:disabled:bg-blue-300 transition duration-75"
                >
                  {mood.isSubmitting ? 'Getting mood...' : 'Get Ok Result'}
                </button>

                <button
                  onClick={() => mood.send([1])}
                  disabled={mood.isSubmitting}
                  className="rounded-2xl text-white px-6 py-4 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 hover:disabled:bg-blue-300 transition duration-75"
                >
                  {mood.isSubmitting ? 'Getting mood...' : 'Get Err Result'}
                </button>

                <h3 className="text-xl">
                  Mood:{' '}
                  {mood.result?.ok
                    ? mood.result.value?.decoded.Ok
                      ? mood.result.value.decoded.Ok.mood
                      : mood.result.value.decoded.Err?.BadMood.mood
                    : '--'}
                </h3>
              </li>
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default HomePage;
