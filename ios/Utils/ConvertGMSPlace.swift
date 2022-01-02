//
//  ConvertGMSPlace.swift
//  GoogleAutocompleteModal
//
//  Created by ZHANGYU on 2022/1/1.
//  Copyright © 2022 Facebook. All rights reserved.
//

import GoogleMapsBase
import GooglePlaces

func convertGMSPlace(_ place: GMSPlace) -> [String: Any] {
    var dic = [String: Any]()

    dic["name"] = place.name
    dic["placeID"] = place.placeID
    dic["coordinate"] = ["latitude": place.coordinate.latitude, "longitude": place.coordinate.longitude]
    dic["phoneNumber"] = place.phoneNumber
    dic["formattedAddress"] = place.formattedAddress
    dic["rating"] = place.rating
    dic["priceLevel"] = place.priceLevel.rawValue
    dic["types"] = place.types
    dic["website"] = place.website?.absoluteString
    dic["addressComponents"] = place.addressComponents
    dic["userRatingsTotal"] = place.userRatingsTotal
    dic["utcOffsetMinutes"] = place.utcOffsetMinutes
    dic["businessStatus"] = place.businessStatus.rawValue

    if let viewport = place.viewport {
        dic["viewport"] = [
            "northEast": [
                "latitude": viewport.northEast.latitude,
                "longitude": viewport.northEast.longitude,
            ],
            "southWest": [
                "latitude": viewport.southWest.latitude,
                "longitude": viewport.southWest.longitude,
            ],
            "valid": viewport.isValid,
        ]
    }

    if let plusColde = place.plusCode {
        dic["plusCode"] = [
            "globalCode": plusColde.globalCode,
            "compoundCode": plusColde.compoundCode,
        ]
    }

    if let addressComponents = place.addressComponents {
        dic["addressComponents"] = addressComponents.map {
            [
                "type": $0.type,
                "types": $0.types,
                "name": $0.name,
                "shortName": $0.shortName,
            ]
        }
    }

    if let openingHours = place.openingHours {
        dic["openingHours"] = [
            "periods": openingHours.periods.map {
                $0.map { [
                    "openEvent": [
                        "day": $0.openEvent.day.rawValue,
                        "time": [
                            "hour": $0.openEvent.time.hour,
                            "minute": $0.openEvent.time.minute,
                        ],
                    ],
                    "closeEvent": [
                        "day": $0.closeEvent?.day.rawValue,
                        "time": [
                            "hour": $0.closeEvent?.time.hour,
                            "minute": $0.closeEvent?.time.minute,
                        ],
                    ],
                ] }
            },
            "weekdayText": openingHours.weekdayText,
        ]
    }

    return dic
}
