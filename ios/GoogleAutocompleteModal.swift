//
//  GoogleAutocompleteModal.swift
//  GoogleAutocompleteModal
//
//  Created by ZHANGYU on 2022/1/1.
//  Copyright © 2022 ZHANGYU. All rights reserved.
//

import GooglePlaces
import UIKit

@objc(GoogleAutocompleteModal)
class GoogleAutocompleteModal: NSObject {
    var topViewController: UIViewController?

    var resolver: RCTPromiseResolveBlock?
    var reject: RCTPromiseRejectBlock?

    @objc func openAutocompleteModal(_ resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        DispatchQueue.main.async { [weak self] in
            self?.topViewController = UIApplication.shared.topViewController

            self?.resolver = resolve
            self?.reject = reject

            let autocomplateViewControll = GMSAutocompleteViewController()
            autocomplateViewControll.delegate = self

            self?.topViewController?.present(autocomplateViewControll, animated: true)
        }
    }
}

extension GoogleAutocompleteModal: GMSAutocompleteViewControllerDelegate {
    func viewController(_ viewController: GMSAutocompleteViewController, didAutocompleteWith place: GMSPlace) {
        print("Place name: \(place.name)")
        print("Place ID: \(place.placeID)")
        print("Place attributions: \(place.attributions)")

        topViewController?.dismiss(animated: true)
    }

    func viewController(_ viewController: GMSAutocompleteViewController, didFailAutocompleteWithError error: Error) {
        // TODO: handle the error.
        print("Error: ", error.localizedDescription)
    }

    func wasCancelled(_ viewController: GMSAutocompleteViewController) {
        topViewController?.dismiss(animated: true)
    }

    func didRequestAutocompletePredictions(_ viewController: GMSAutocompleteViewController) {
        UIApplication.shared.isNetworkActivityIndicatorVisible = true
    }

    func didUpdateAutocompletePredictions(_ viewController: GMSAutocompleteViewController) {
        UIApplication.shared.isNetworkActivityIndicatorVisible = false
    }
}
