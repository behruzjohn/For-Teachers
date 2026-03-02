import type { TypeOfObject } from './types/types';
import { BorderStyle } from 'exceljs';

export const Data: TypeOfObject[] = [
  {
    id: 1,
    fullName: 'Behruz Baxtiyorov',
    exercises1: 15,
    exercises2: 15,
    exercises3: 15,
    total: 312,
    persond: 83,
  },
  {
    id: 2,
    fullName: 'Ibrohim Baxtiyorov',
    exercises1: 15,
    exercises2: 15,
    exercises3: 15,
    total: 312,
    persond: 83,
  },
  {
    id: 3,
    fullName: 'Azizbek Baxtiyorov',
    exercises1: 13,
    exercises2: 15,
    exercises3: 15,
    total: 312,
    persond: 83,
  },
  {
    id: 4,
    fullName: 'Muhammadjon Baxtiyorov',
    exercises1: 13,
    exercises2: 15,
    exercises3: 15,
    total: 312,
    persond: 83,
  },

  {
    id: 5,
    fullName: 'Iymona Baxtiyorova',
    exercises1: 7,
    exercises2: 15,
    exercises3: 15,
    total: 312,
    persond: 83,
  },
];

export const Columns = [
  { header: '№', key: 'id', width: 5 },
  { header: 'FIO', key: 'fio', width: 40 },
  { header: `1-topshiriq `, key: 'exercise1', width: 20 },
  { header: '2-topshiriq (15 bal)', key: 'exercise2', width: 20 },
  { header: '3-topshiriq (15 bal)', key: 'exercise3', width: 20 },
  { header: 'Total', key: 'total', width: 20 },
  { header: '%', key: 'persond', width: 20 },
];

export const borderStyle = {
  top: { style: 'thin' as BorderStyle, color: { argb: '000000' } },
  left: { style: 'thin' as BorderStyle, color: { argb: '000000' } },
  bottom: { style: 'thin' as BorderStyle, color: { argb: '000000' } },
  right: { style: 'thin' as BorderStyle, color: { argb: '000000' } },
};

export const borderStyleForHeaderTitle = {
  left: { style: 'thin' as BorderStyle, color: { argb: '000000' } },
  bottom: { style: 'thin' as BorderStyle, color: { argb: '000000' } },
  right: { style: 'thin' as BorderStyle, color: { argb: '000000' } },
};

export const Title = 'Jizzax Shahar 11 umum talim maktabi';
export const Title2 =
  "9 G -  fanidan  3-chorak   BSB - 2 natijalari tahlili O'qituvchi: Baxtiyorov Behruz";
