//
//  Extensions.swift
//  GoogleAutocompleteModal
//
//  Created by ZHANGYU on 2022/1/1.
//  Copyright © 2022 ZHANGYU. All rights reserved.
//

import UIKit

extension UIApplication {
    var topViewController: UIViewController? {
        if #available(iOS 13, *) {
            var controller = UIApplication.shared.windows.filter(\.isKeyWindow).first?.rootViewController
            while let presentedViewController = controller?.presentedViewController {
                controller = presentedViewController
            }
            return controller
        } else {
            var controller = UIApplication.shared.keyWindow?.rootViewController
            while let presentedViewController = controller?.presentedViewController {
                controller = presentedViewController
            }
            return controller
        }
    }
}
