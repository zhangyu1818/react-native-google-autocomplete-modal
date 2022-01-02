//
//  GoogleAutocompleteModal.m
//  GoogleAutocompleteModal
//
//  Created by ZHANGYU on 2022/1/1.
//  Copyright © 2022 ZHANGYU. All rights reserved.
//

#import <Foundation/Foundation.h>

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(GoogleAutocompleteModal, NSObject)

RCT_EXTERN_METHOD(openAutocompleteModal: (NSDictionary *) options resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject);

@end
