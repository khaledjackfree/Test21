/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type AppMode = 'menu' | 'cloud_sender' | 'local_receiver' | 'qr_beam' | 'sound_pulse' | 'how_it_works' | 'cloud_tunnel';

export interface QuantumFile {
  id: string;
  name: string;
  size: number; // in bytes
  type: string;
  content?: string; // base64 or plaintext
  planetSource?: string;
  transmissionMethod?: 'Quantum Beam' | 'Visual Matrix' | 'Acoustic Sonic';
}

export interface SyncLog {
  id: string;
  time: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'pulse';
}

export interface QRChunk {
  index: number;
  total: number;
  data: string;
  checksum: string;
}
