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

export type TrackId = 'LEG-U1-CONCEITOS' | 'LEG-U3-SINALIZACAO-I'

type TrackCardBlock = {
  kind: 'card'
  id: string
  title: string
  body: string
}

type TrackQuizBlock = {
  kind: 'quiz'
  id: string
  questions: Array<{
    id: string
    stem: string
    choices: Array<{
      id: string
      text: string
    }>
    correctId: string
    explain: string
  }>
}

type TrackImageBlock = {
  kind: 'image'
  id: string
  caption: string
  src: string
  alt: string
}

type TrackDrillSignsBlock = {
  kind: 'drill-signs'
  id: string
  signs: Array<{
    code: string
    name: string
    img: string
  }>
}

type TrackVideoBlock = {
  kind: 'video'
  id: string
  caption: string
  src: string
}

type TrackBlock =
  | TrackCardBlock
  | TrackQuizBlock
  | TrackImageBlock
  | TrackDrillSignsBlock
  | TrackVideoBlock

export interface Track {
  id: TrackId
  title: string
  blocks: TrackBlock[]
}

type AutoEscolaVersionId =
  | 'AES-V1'
  | 'AES-V2'
  | 'AES-V3'
  | 'AES-V4'
  | 'AES-V5'
  | 'AES-V6'
  | 'AES-V7'

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
  'AES-V1': autoEscolaV1,
  'AES-V2': autoEscolaV2,
  'AES-V3': autoEscolaV3,
  'AES-V4': autoEscolaV4,
  'AES-V5': autoEscolaV5,
  'AES-V6': autoEscolaV6,
  'AES-V7': autoEscolaV7,
}

const tracks: Record<TrackId, Track> = {
  'LEG-U1-CONCEITOS': trackU1 as Track,
  'LEG-U3-SINALIZACAO-I': trackU3 as Track,
}

export function isTrackId(value: string | undefined): value is TrackId {
  return typeof value === 'string' && value in tracks
}

export function loadTrackById(id: TrackId): Track {
  return tracks[id]
}

export function loadAutoEscolaManifest(): AutoEscolaManifest {
  return autoEscolaManifest as AutoEscolaManifest
}

export function loadAutoEscolaVersion(id: AutoEscolaVersionId): AutoEscolaCurriculum {
  return autoEscolaSimVersions[id]
}
