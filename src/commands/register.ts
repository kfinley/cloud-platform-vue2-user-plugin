import { Inject } from 'inversify-props';
import { RegisterRequest, RegisterResponse } from '../types';
import { Command } from '@cloud-platform/commands/src';
import { ApiClient } from '@cloud-platform/api-client/src';
import registrationResources from '../resources/registration';

export class RegisterCommand implements Command<RegisterRequest, RegisterResponse> {

  @Inject('ApiClient')
  private apiClient!: ApiClient;

  public async runAsync(registration: RegisterRequest): Promise<RegisterResponse> {
    const response = await this.apiClient.postAsync<RegisterResponse>(registrationResources.register, registration);

    if (response.status === 200) {
      return response.data;
    }

    throw new Error(`Registration failed. Error: ${response.data.error}`);
  }
}
