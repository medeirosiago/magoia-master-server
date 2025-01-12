export interface HomeAssitantGateway {
  turnByEntityAndDomain(entityId: string | string[], haDomain: string, status: string): Promise<any>;
}