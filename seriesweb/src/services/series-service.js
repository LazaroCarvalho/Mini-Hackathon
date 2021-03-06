import { doRequest } from './baseapi-services'

const RESOURCE = 'series/'

export const listar = () => {
    return doRequest(RESOURCE, 'GET')
}

export const inserir = (serie) => {
    return doRequest(RESOURCE, 'POST', serie)
}
export const remover = (id) => {
    return doRequest(RESOURCE, 'DELETE', '', id)
}
export const atualizar = (serie) => {
    return doRequest(RESOURCE, 'PUT', serie, serie.id)
}