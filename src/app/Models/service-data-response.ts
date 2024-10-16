import { ServiceResponse } from "./service-response";

export class ServiceDataResponse<T> extends ServiceResponse {
  data?: T;
}
