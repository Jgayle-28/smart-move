import { basement } from './items/basement'
import { bathroom } from './items/bathroom'
import { bathRooms } from './items/bathRooms'
import { bedRoom2 } from './items/bedRoom2'
import { bedRoom3 } from './items/bedRoom3'
import { bedRoom4 } from './items/bedRoom4'
import { bedRoom5 } from './items/bedRoom5'
import { boxesCp } from './items/boxesCp'
import { boxesPbo } from './items/boxesPbo'
import { breakRoom } from './items/breakRoom'
import { conferenceRoom } from './items/conferenceRoom'
import { diningRoom } from './items/diningRoom'
import { entryWay } from './items/entryWay'
import { familyRoom } from './items/familyRoom'
import { garage } from './items/garage'
import { kitchen } from './items/kitchen'
import { laundryRoom } from './items/laundryRoom'
import { livingRoom } from './items/livingRoom'
import { masterBed } from './items/masterBed'
import { musicalInstruments } from './items/musicalInstruments'
import { office } from './items/office'
import { reception } from './items/reception'
import { sportsFitness } from './items/sportsFitness'
import { waitingRoom } from './items/waitingRoom'
import { yardPatio } from './items/yardPatio'

export const roomList = [
  { label: 'Entryway', value: 'Entryway', items: entryWay },
  { label: 'Family Room', value: 'Family Room', items: familyRoom },
  { label: 'Living Room', value: 'Living Room', items: livingRoom },
  { label: 'Dining Room', value: 'Dining Room', items: diningRoom },
  { label: 'Kitchen', value: 'Kitchen', items: kitchen },
  { label: 'Master Bedroom', value: 'Master Bedroom', items: masterBed },
  { label: 'Bedroom 2', value: 'Bedroom 2', items: bedRoom2 },
  { label: 'Bedroom 3', value: 'Bedroom 3', items: bedRoom3 },
  { label: 'Bedroom 4', value: 'Bedroom 4', items: bedRoom4 },
  { label: 'Bedroom 5', value: 'Bedroom 5', items: bedRoom5 },
  { label: 'Office', value: 'Office', items: office },
  { label: 'Bathroom', value: 'Bathroom', items: bathroom },
  { label: 'Laundry Room', value: 'Laundry Room', items: laundryRoom },
  { label: 'Garage', value: 'Garage', items: garage },
  { label: 'Yard / Patio', value: 'Yard / Patio', items: yardPatio },
  {
    label: 'Musical Instruments',
    value: 'Musical Instruments',
    items: musicalInstruments,
  },
  {
    label: 'Sports and Fitness',
    value: 'Sports and Fitness',
    items: sportsFitness,
  },
  {
    label: 'Boxes - Packed By Owner',
    value: 'Boxes - Packed By Owner',
    items: boxesPbo,
  },
  {
    label: 'Boxes - Packed By Company',
    value: 'Boxes - Packed By Company',
    items: boxesCp,
  },
  { label: 'Basement', value: 'Basement', items: basement },
  { label: 'Reception', value: 'Reception', items: reception },
  { label: 'Conference Room', value: 'Conference Room', items: conferenceRoom },
  { label: 'Waiting Room', value: 'Waiting Room', items: waitingRoom },
  { label: 'Break Room', value: 'Break Room', items: breakRoom },
  { label: 'Bath Room(s)', value: 'Bath Room(s)', items: bathRooms },
]
