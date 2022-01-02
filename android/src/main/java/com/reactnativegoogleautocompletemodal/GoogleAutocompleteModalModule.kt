package com.reactnativegoogleautocompletemodal

import com.facebook.react.bridge.*
import com.facebook.react.bridge.BaseActivityEventListener
import com.facebook.react.bridge.ActivityEventListener

import com.google.android.libraries.places.api.Places
import com.google.android.libraries.places.api.model.Place
import com.google.android.libraries.places.widget.Autocomplete
import com.google.android.libraries.places.widget.model.AutocompleteActivityMode
import com.google.android.libraries.places.widget.AutocompleteActivity

import android.app.Activity
import android.content.Intent
import android.util.Log

private const val AUTOCOMPLETE_REQUEST_CODE = 1

class GoogleAutocompleteModalModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

  private lateinit var promise: Promise

  private val autoCompleteActivityEventListener: ActivityEventListener = object : BaseActivityEventListener() {
    override fun onActivityResult(activity: Activity, requestCode: Int, resultCode: Int, intent: Intent) {
      if (requestCode == AUTOCOMPLETE_REQUEST_CODE) {
        when (resultCode) {
          Activity.RESULT_OK -> {
            val place = Autocomplete.getPlaceFromIntent(intent)
            val result = convertPlace(place)
            promise.resolve(result)
          }
          AutocompleteActivity.RESULT_ERROR -> {
            val status = Autocomplete.getStatusFromIntent(intent)
            status.statusMessage?.let {
              Log.e("Error", it)
              promise.reject("Error", it)
            }
          }
        }
      }
    }
  }

  init {
    val apiKey = reactApplicationContext.getString(R.string.apiKey)
    if (!Places.isInitialized() && apiKey != "UNSET") {
      Places.initialize(reactApplicationContext, apiKey)
    }

    reactContext.addActivityEventListener(autoCompleteActivityEventListener);
  }

  override fun getName(): String {
    return "GoogleAutocompleteModal"
  }


  @ReactMethod
  fun openAutocompleteModal(options: ReadableMap, promise: Promise) {
    this.promise = promise

    val autocompleteIntent = Autocomplete.IntentBuilder(AutocompleteActivityMode.FULLSCREEN, Place.Field.values().toList())

    options.getString("country")?.let {
      autocompleteIntent.setCountry(it)
    }

    options.getArray("countries")?.let {
      val countries = Arguments.toList(it) as List<String>
      autocompleteIntent.setCountries(countries)
    }

    currentActivity?.startActivityForResult(autocompleteIntent.build(reactApplicationContext), AUTOCOMPLETE_REQUEST_CODE)
  }

}
