import { assign } from 'lodash';
import Hotel from '../models/hotel.server.model';
import { hotels } from '../data/data';

export const findHotels = function(hotelName, stars){
    return new Promise(function(resolve, reject){
        let errResult;
        let hotelsResult;
        let string = hotelName || '';
        let nameValue = { name: { $regex: string, $options: 'i' } };
        let starsValue = { stars };
        let query;
        
        if(hotelName && stars){
            query = { $and: [nameValue, starsValue] };
        }
        if(!hotelName){
            query = starsValue;
        }
        if(!stars){
            query = nameValue;
        }
        
        Hotel.find(query, (err, hotels) => {
            errResult = err;
            hotelsResult = hotels;
            if (err){
                reject(errResult);
            }
            resolve(hotelsResult);
        });
    });
};

export const deleteHotel = function(id){
    return new Promise(function(resolve, reject) {
        Hotel.findOneAndRemove({ id }, (err, hotel) => {
            if (!hotel){
                reject('Hotel not found');
            }
            resolve();
        });
    });
};

export const insertHotel = function (hotel) {
    return new Promise(function(resolve, reject) {
        let errResult;
        Hotel.create(hotel, (err) => {
            errResult = err;
            if (err){
                reject(errResult);
            }
            resolve();
        });
    });
};

export const updateHotel = function(hotel) {
    return new Promise(function(resolve, reject) {
        Hotel.findOneAndUpdate({ id: hotel.id }, hotel, (err) => {
            if (err){
                reject('Something went wrong.');
            }
            resolve();
        });
    });
};