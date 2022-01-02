package com.reactnativegoogleautocompletemodal

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap

import com.google.android.libraries.places.api.model.Place

fun convertPlace(place: Place): WritableMap {
  val result = Arguments.createMap()
  place.name?.let { result.putString("name", it) }
  place.id?.let { result.putString("placeID", it) }
  place.latLng?.let {
    val coordinate = Arguments.createMap()
    coordinate.putDouble("latitude", it.latitude)
    coordinate.putDouble("longitude", it.longitude)
    result.putMap("coordinate", coordinate)
  }
  place.phoneNumber?.let { result.putString("phoneNumber", it) }
  place.address?.let { result.putString("formattedAddress", it) }
  place.rating?.let { result.putDouble("rating", it) }
  place.priceLevel?.let { result.putInt("priceLevel", it) }
  place.types?.let {
    result.putArray("types", Arguments.fromList(it.map { item -> item.name }))
  }
  place.websiteUri?.let { result.putString("website", it.toString()) }
  place.addressComponents?.let {
    val addressComponents = Arguments.createArray()
    it.asList().forEach { item ->
      val addressComponent = Arguments.createMap()
      addressComponent.putString("name", item.name)
      addressComponent.putString("shortName", item.shortName)
      addressComponent.putArray("types", Arguments.fromList(item.types))
      addressComponents.pushMap(addressComponent)
    }
    result.putArray("addressComponents", addressComponents)
  }
  place.userRatingsTotal?.let { result.putInt("userRatingsTotal", it) }
  place.utcOffsetMinutes?.let { result.putInt("utcOffsetMinutes", it) }
  place.businessStatus?.let { result.putInt("businessStatus", it.ordinal) }

  place.viewport?.let {
    val northEast = Arguments.createMap()
    northEast.putDouble("latitude", it.northeast.latitude)
    northEast.putDouble("longitude", it.northeast.longitude)
    val southWest = Arguments.createMap()
    southWest.putDouble("latitude", it.southwest.latitude)
    southWest.putDouble("longitude", it.southwest.longitude)

    val viewport = Arguments.createMap()
    viewport.putMap("northEast", northEast)
    viewport.putMap("southWest", southWest)
  }

  place.plusCode?.let {
    val plusCode = Arguments.createMap()
    plusCode.putString("globalCode", it.globalCode)
    plusCode.putString("compoundCode", it.compoundCode)
  }

  place.openingHours?.let {
    val openingHours = Arguments.createMap()
    val periods = Arguments.createArray()
    it.periods.forEach { item ->
      val period = Arguments.createMap()
      val openEvent = Arguments.createMap()
      item.open?.day?.let { day -> openEvent.putInt("day", day.ordinal) }
      val openTime = Arguments.createMap()
      item.open?.time?.let { time ->
        openTime.putInt("hour", time.hours)
        openTime.putInt("minute", time.minutes)
      }
      openEvent.putMap("time", openTime)

      val closeEvent = Arguments.createMap()
      item.open?.day?.let { day -> closeEvent.putInt("day", day.ordinal) }
      val closeTime = Arguments.createMap()
      item.open?.time?.let { time ->
        closeTime.putInt("hour", time.hours)
        closeTime.putInt("minute", time.minutes)
      }
      closeEvent.putMap("time", closeTime)

      period.putMap("openEvent", openEvent)
      period.putMap("closeEvent", closeEvent)

      periods.pushMap(period)
    }
    openingHours.putArray("periods", periods)
    openingHours.putArray("weekdayText", Arguments.fromList(it.weekdayText))
    result.putMap("openingHours", openingHours)
  }

  return result
}
