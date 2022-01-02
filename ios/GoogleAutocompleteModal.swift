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
    func viewController(_: GMSAutocompleteViewController, didAutocompleteWith place: GMSPlace) {
        let currentPlace = convertGMSPlace(place)
        resolver?(currentPlace)
        topViewController?.dismiss(animated: true)
    }

    func viewController(_: GMSAutocompleteViewController, didFailAutocompleteWithError error: Error) {
        // TODO: handle the error.
        print("Error: ", error.localizedDescription)
        reject?(error.localizedDescription, nil, error)
    }

    func wasCancelled(_: GMSAutocompleteViewController) {
        topViewController?.dismiss(animated: true)
    }

    func didRequestAutocompletePredictions(_: GMSAutocompleteViewController) {
        UIApplication.shared.isNetworkActivityIndicatorVisible = true
    }

    func didUpdateAutocompletePredictions(_: GMSAutocompleteViewController) {
        UIApplication.shared.isNetworkActivityIndicatorVisible = false
    }
}
