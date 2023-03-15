import { Either } from './fp/either';
import { fromNullable, Maybe } from './fp/maybe';
import { mockClient, mockExecutor } from './mocks';
import { ClientUser, Demand } from './types';

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const fetchExecutor = () => sleep(500).then(() => mockExecutor);

export const fetchClient = (): Promise<Array<ClientUser>> =>
  sleep(700).then(() =>
    mockClient.map((eachClient) => {
      return {
        ...eachClient,
        demands: fromNullable(eachClient.demands),
      };
    })
  );
