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

export const getRoomItems = (room) => {
  switch (room) {
    case 'Basement':
      return basement
    case 'Bathroom':
      return bathroom
    case 'BathRooms':
      return bathRooms
    case 'Bedroom 2':
      return bedRoom2
    case 'Bedroom 3':
      return bedRoom3
    case 'Bedroom 4':
      return bedRoom4
    case 'Bedroom 5':
      return bedRoom5
    case 'Boxes - Packed By Company':
      return boxesCp
    case 'Boxes - Packed By Owner':
      return boxesPbo
    case 'Break Room':
      return breakRoom
    case 'Conference Room':
      return conferenceRoom
    case 'Dining Room':
      return diningRoom
    case 'Entryway':
      return entryWay
    case 'Family Room':
      return familyRoom
    case 'Garage':
      return garage
    case 'Kitchen':
      return kitchen
    case 'Laundry Room':
      return laundryRoom
    case 'Living Room':
      return livingRoom
    case 'Master Bedroom':
      return masterBed
    case 'Musical Instruments':
      return musicalInstruments
    case 'Office':
      return office
    case 'Reception':
      return reception
    case 'Sports and Fitness':
      return sportsFitness
    case 'Waiting Room':
      return waitingRoom
    case 'Yard / Patio':
      return yardPatio
    default:
      return entryWay
  }
}
