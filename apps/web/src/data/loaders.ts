/**
 * Utilidades temporárias para carregar conteúdo local.
 * Em produção, estes dados devem ser fornecidos pela API.
 */
import trackU1 from './tracks/ph/legislacao/u1_conceitos.json'
import trackU3 from './tracks/ph/legislacao/u3_sinalizacao_I.json'

import autoEscolaManifest from './tracks/aes/manifest.json'
import autoEscolaV1 from './tracks/aes/versions/v1/curriculum.json'
import autoEscolaV2 from './tracks/aes/versions/v2/curriculum.json'
import autoEscolaV3 from './tracks/aes/versions/v3/curriculum.json'
import autoEscolaV4 from './tracks/aes/versions/v4/curriculum.json'
import autoEscolaV5 from './tracks/aes/versions/v5/curriculum.json'
import autoEscolaV6 from './tracks/aes/versions/v6/curriculum.json'
import autoEscolaV7 from './tracks/aes/versions/v7/curriculum.json'

type TrackId = 'LEG-U1-CONCEITOS' | 'LEG-U3-SINALIZACAO-I'

type AutoEscolaVersionId = 'v1' | 'v2' | 'v3' | 'v4' | 'v5' | 'v6' | 'v7'

type AutoEscolaCurriculum = {
  id: string
  label: string
  summary: string
  modules: Array<{
    id: string
    title: string
    description: string
    lessons: Array<{
      id: string
      title: string
      status: 'draft' | 'planned'
      notes: string[]
    }>
  }>
}

type AutoEscolaManifest = {
  trackId: string
  title: string
  description: string
  versions: Array<{
    id: AutoEscolaVersionId
    label: string
    status: 'draft' | 'planned'
    summary: string
  }>
}

const autoEscolaSimVersions: Record<AutoEscolaVersionId, AutoEscolaCurriculum> = {
  v1: autoEscolaV1,
  v2: autoEscolaV2,
  v3: autoEscolaV3,
  v4: autoEscolaV4,
  v5: autoEscolaV5,
  v6: autoEscolaV6,
  v7: autoEscolaV7,
}

const tracks: Record<TrackId, unknown> = {
  'LEG-U1-CONCEITOS': trackU1,
  'LEG-U3-SINALIZACAO-I': trackU3,
}

export function loadTrackById(id: TrackId) {
  return tracks[id]
}

export function loadAutoEscolaManifest(): AutoEscolaManifest {
  return autoEscolaManifest as AutoEscolaManifest
}

export function loadAutoEscolaVersion(id: AutoEscolaVersionId): AutoEscolaCurriculum {
  return autoEscolaSimVersions[id]
}
