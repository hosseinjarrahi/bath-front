import { get as getSafe } from 'lodash'

function getBulkStatus(truck) {}

function getContainerStatus(truck) {
  const ccsInvoice = getSafe(truck, 'ccs_data.tabari_invoice', false)
  const containerInvoice = getSafe(truck, 'container.invoice', false)

  if (!containerInvoice && !ccsInvoice) return 0

  if (getSafe(containerInvoice, 'id') === getSafe(ccsInvoice, 'id')) return 100

  if (getSafe(containerInvoice, 'id', false) && !ccsInvoice) return 30

  if (!containerInvoice && getSafe(ccsInvoice, 'id')) return 80

  if (getSafe(containerInvoice, 'id') !== getSafe(ccsInvoice, 'id')) return 50
}

function truckStatus(truck) {
  const truckLoadType = 'container'

  const map = {
    container: getContainerStatus,
    bulk: getBulkStatus,
  }

  return map[truckLoadType](truck)
}

function statusMessage(truck) {
  const map = {
    100: 'اطلاعات فاکتور کامیون تایید شد',
    30: 'اطلاعات فاکتور کامیون با کدکانتینر تایید شد',
    50: 'اطلاعات فاکتور کامیون با کدکانتینر و پلاک متفاوت است',
    80: 'اطلاعات فاکتور کامیون با پلاک تایید شد' + ' (احتمال استریپ)',
    0: 'اطلاعات فاکتور کامیون تایید نشد',
  }

  return truck
    ? getSafe(map, truckStatus(truck), '---------------')
    : '------------------'
}

function statusColor(truck) {
  const map = {
    100: 'green',
    30: 'yellow',
    50: 'purple',
    80: 'lightgreen',
    0: 'red',
  }

  return truck ? getSafe(map, truckStatus(truck), 'white') : 'white'
}

function isContainer(truck) {
  return truck.ccs || truck.containerShow
}

export default {
  statusMessage,
  truckStatus,
  statusColor,
  isContainer,
}
