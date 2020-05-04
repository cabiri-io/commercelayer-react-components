import PropTypes from 'prop-types'
import childrenTypes from '../utils/childrenTypes'
import {
  TimeFormat,
  BaseInputType,
  GiftCardInputName,
  baseOrderComponentPricePropTypes,
  LineItemType,
  BasePriceType,
  BaseFormatPrice,
  PTLoader,
  BMObject,
  BaseSelectorType,
} from '../@types'
import { ErrorPropTypes } from '../@types/errors'
import { BaseInputComponentPropTypes } from '../@types/index'

const components = {
  AddToCartButton: {
    displayName: 'AddToCartButton',
    description: '',
    propTypes: {
      children: PropTypes.func,
      label: PropTypes.string,
      skuCode: PropTypes.string,
      disabled: PropTypes.bool,
    },
    defaultProps: {
      label: 'Add to cart',
    },
  },
  AvailabilityContainer: {
    displayName: 'AvailabilityContainer',
    description: '',
    permittedChildren: ['AvailabilityTemplate', 'ReactNode'],
    propTypes: {
      children: childrenTypes.isRequired,
      skuCode: PropTypes.string,
    },
  },
  AvailabilityTemplate: {
    displayName: 'AvailabilityTemplate',
    description: '',
    propTypes: {
      timeFormat: PropTypes.oneOf<TimeFormat>(['days', 'hours']),
      showShippingMethodName: PropTypes.bool,
      children: PropTypes.func,
    },
    defaultProps: {
      timeFormat: 'days',
      showShippingMethodName: false,
    },
  },
  CheckoutLink: {
    displayName: 'CheckoutLink',
    description: '',
    propTypes: {
      children: PropTypes.func,
      label: PropTypes.string,
    },
    defaultProps: {
      label: 'Checkout',
    },
  },
  CommerceLayer: {
    permittedChildren: [
      'OrderContainer',
      'PricesContainer',
      'GiftCardContainer',
      'AvailabilityContainer',
      'ReactNode',
    ],
    propTypes: {
      children: childrenTypes.isRequired,
      accessToken: PropTypes.string.isRequired,
      endpoint: PropTypes.string.isRequired,
      cache: PropTypes.bool,
    },
    defaultProps: {
      cache: false,
    },
  },
  DiscountAmount: {
    displayName: 'DiscountAmount',
    description: '',
    propTypes: baseOrderComponentPricePropTypes,
    defaultProps: {
      format: 'formatted' as BaseFormatPrice,
    },
  },
  Errors: {
    displayName: 'Errors',
    description: '',
    propTypes: ErrorPropTypes,
    defaultProps: {
      messages: [],
      field: 'base',
    },
  },
  GiftCard: {
    permittedChildren: [
      'GiftCardCurrencySelector',
      'GiftCardInput',
      'Errors',
      'MetadataInput',
      'SubmitButton',
      'ReactNode',
    ],
    displayName: 'GiftCard',
    description: '',
    propTypes: {
      children: childrenTypes.isRequired,
      metadata: PropTypes.objectOf(PropTypes.string),
      onSubmit: PropTypes.func,
    },
    defaultProps: {
      onSubmit: undefined,
      metadata: {},
    },
  },
  GiftCardContainer: {
    permittedChildren: ['GiftCard', 'ReactNode'],
    displayName: 'GiftCardContainer',
    description: '',
    propTypes: {
      children: childrenTypes.isRequired,
    },
  },
  GiftCardCurrencySelector: {
    displayName: 'GiftCardCurrencySelector',
    description: '',
    propTypes: {
      children: PropTypes.func,
      placeholder: PropTypes.exact({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        label: PropTypes.string,
      }),
      value: PropTypes.string,
      required: PropTypes.bool,
    },
    defaultProps: {
      required: true,
    },
  },
  GiftCardInput: {
    displayName: 'GiftCardInput',
    description: '',
    propTypes: {
      type: PropTypes.oneOf<BaseInputType>([
        'text',
        'email',
        'number',
        'date',
        'checkbox',
      ]).isRequired,
      name: PropTypes.oneOf<GiftCardInputName>([
        'balanceCents',
        'balanceMaxCents',
        'singleUse',
        'rechargeable',
        'imageUrl',
        'expiresAt',
        'referenceOrigin',
        'email',
        'firstName',
        'lastName',
        'reference',
      ]).isRequired,
      children: PropTypes.func,
      placeholder: PropTypes.string,
    },
  },
  GiftCardAmount: {
    displayName: 'GiftCardAmount',
    description: '',
    propTypes: baseOrderComponentPricePropTypes,
  },
  ItemContainer: {
    permittedChildren: [
      'PricesContainer',
      'VariantsContainer',
      'SkuOptionContainer',
      'QuantitySelector',
      'AddToCartButton',
      'AvailabilityContainer',
      'ReactNode',
    ],
    displayName: 'ItemContainer',
    description: '',
    propTypes: {
      children: childrenTypes.isRequired,
      skuCode: PropTypes.string,
      lineItem: PropTypes.exact({
        name: PropTypes.string.isRequired,
        imageUrl: PropTypes.string,
      }),
    },
  },
  LineItem: {
    permittedChildren: [
      'LineItemImage',
      'LineItemName',
      'LineItemOptions',
      'LineItemQuantity',
      'LineItemPrice',
      'LineItemRemove',
      'Errors',
      'ReactNode',
    ],
    displayName: 'LineItem',
    description: '',
    propTypes: {
      children: childrenTypes.isRequired,
      type: PropTypes.oneOf<LineItemType>([
        'skus',
        'gift_cards',
        'shipments',
        'paymentMethods',
        'promotions',
      ]),
    },
    defaultProps: {
      type: 'skus',
    },
  },
  LineItemImage: {
    displayName: 'LineItemImage',
    description: '',
    propTypes: {
      width: PropTypes.number,
      src: PropTypes.string,
      children: PropTypes.func,
    },
  },
  LineItemName: {
    displayName: 'LineItemName',
    description: '',
    propTypes: {
      children: PropTypes.func,
      label: PropTypes.string,
    },
  },
  LineItemOption: {
    displayName: 'LineItemOption',
    description: '',
    propTypes: {
      name: PropTypes.string.isRequired,
      children: PropTypes.func,
      valueClassName: PropTypes.string,
      keyClassName: PropTypes.string,
      keyId: PropTypes.string,
      keyStyle: PropTypes.object,
    },
  },
  LineItemOptions: {
    permittedChildren: ['LineItemOption', 'ReactNode'],
    displayName: 'LineItemOptions',
    description: '',
    propTypes: {
      name: PropTypes.string.isRequired,
      children: childrenTypes.isRequired,
      showName: PropTypes.bool,
    },
    defaultProps: {
      showName: true,
    },
  },
  LineItemPrice: {
    displayName: 'LineItemPrice',
    description: '',
    propTypes: {
      ...baseOrderComponentPricePropTypes,
      type: PropTypes.oneOf<BasePriceType>(['total', 'unit', 'option']),
    },
    defaultProps: {
      format: 'formatted' as BaseFormatPrice,
      type: 'total' as BasePriceType,
    },
  },
  LineItemQuantity: {
    displayName: 'LineItemQuantity',
    description: '',
    propTypes: {
      children: PropTypes.func,
      max: PropTypes.number,
      disabled: PropTypes.bool,
    },
    defaultProps: {
      max: 50,
    },
  },
  LineItemRemove: {
    displayName: 'LineItemRemove',
    description: '',
    propTypes: {
      children: PropTypes.func,
      label: PropTypes.string,
    },
    defaultProps: {
      label: 'remove',
    },
  },
  LineItemsContainer: {
    permittedChildren: ['LineItemsCount', 'LineItem', 'ReactNode'],
    displayName: 'LineItemsContainer',
    description: '',
    propTypes: {
      children: childrenTypes.isRequired,
      filters: PropTypes.object,
      loader: PTLoader,
    },
    defaultProps: {
      filters: {},
      loader: 'Loading...',
    },
  },
  LineItemsCount: {
    displayName: 'LineItemsCount',
    description: '',
    propTypes: {
      children: PropTypes.func,
      id: PropTypes.string,
      className: PropTypes.string,
      name: PropTypes.string,
      style: PropTypes.object,
    },
  },
  MetadataInput: {
    displayName: 'MetadataInput',
    description: '',
    propTypes: BaseInputComponentPropTypes,
  },
  OrderContainer: {
    permittedChildren: [
      'ItemContainer',
      'LineItemsContainer',
      'SubTotalAmount',
      'DiscountAmount',
      'ShippingAmount',
      'TaxesAmount',
      'GiftCardAmount',
      'TotalAmount',
      'CheckoutLink',
      'GiftCardContainer',
      'ReactNode',
    ],
    displayName: 'OrderContainer',
    description: '',
    propTypes: {
      children: childrenTypes.isRequired,
      persistKey: PropTypes.string.isRequired,
      metadata: BMObject,
    },
    defaultProps: {
      metadata: {},
    },
  },
  Price: {
    displayName: 'Price',
    description: '',
    propTypes: {
      children: PropTypes.func,
      compareClassName: PropTypes.string,
      skuCode: PropTypes.string,
      showCompare: PropTypes.bool,
    },
    defaultProps: {
      skuCode: '',
    },
  },
  PricesContainer: {
    permittedChildren: ['Price', 'ReactNode'],
    displayName: 'PricesContainer',
    description: '',
    propTypes: {
      children: childrenTypes.isRequired,
      skuCode: PropTypes.string,
      loader: PTLoader,
      perPage: PropTypes.number,
      filters: PropTypes.object,
    },
    defaultProps: {
      perPage: 10,
      filters: {},
      loader: 'Loading...',
      skuCode: '',
    },
  },
  // PriceTemplate: {
  //   displayName: 'PriceTemplate',
  //   description: '',
  //   propTypes: {
  //     formattedAmount: PropTypes.string,
  //     formattedCompare: PropTypes.string,
  //   },
  //   defaultProps: {
  //     formattedAmount: '',
  //     formattedCompare: '',
  //   },
  // },
  QuantitySelector: {
    displayName: 'QuantitySelector',
    description: '',
    propTypes: {
      children: PropTypes.func,
      min: PropTypes.string,
      max: PropTypes.string,
      value: PropTypes.string,
      skuCode: PropTypes.string,
      disabled: PropTypes.bool,
    },
    defaultProps: {
      min: '1',
    },
  },
  ShippingAmount: {
    displayName: 'ShippingAmount',
    description: '',
    propTypes: baseOrderComponentPricePropTypes,
  },
  SkuOption: {
    permittedChildren: ['SkuOptionInput', 'ReactNode'],
    displayName: 'SkuOption',
    description: '',
    propTypes: {
      children: childrenTypes.isRequired,
      name: PropTypes.string.isRequired,
    },
  },
  SkuOptionInput: {
    displayName: 'SkuOptionInput',
    description: '',
    propTypes: BaseInputComponentPropTypes,
  },
  SkuOptionsContainer: {
    permittedChildren: ['SkuOption', 'ReactNode'],
    displayName: 'SkuOptionsContainer',
    description: '',
    propTypes: {
      children: childrenTypes.isRequired,
      skuCode: PropTypes.string,
    },
  },
  SubmitButton: {
    displayName: 'SubmitButton',
    description: '',
    propTypes: {
      children: PropTypes.func,
      label: PropTypes.string,
    },
    defaultProps: {
      label: 'Submit',
    },
  },
  SubTotalAmount: {
    displayName: 'SubTotalAmount',
    description: '',
    propTypes: baseOrderComponentPricePropTypes,
    defaultProps: {
      format: 'formatted' as BaseFormatPrice,
    },
  },
  TaxesAmount: {
    displayName: 'TaxesAmount',
    description: '',
    propTypes: baseOrderComponentPricePropTypes,
    defaultProps: {
      format: 'formatted' as BaseFormatPrice,
    },
  },
  TotalAmount: {
    displayName: 'TotalAmount',
    description: '',
    propTypes: baseOrderComponentPricePropTypes,
    defaultProps: {
      format: 'formatted' as BaseFormatPrice,
    },
  },
  VariantsContainer: {
    permittedChildren: ['VariantSelector', 'ReactNode'],
    displayName: 'VariantsContainer',
    description: '',
    propTypes: {
      children: childrenTypes.isRequired,
      skuCode: PropTypes.string,
      filters: PropTypes.object,
    },
    defaultProps: {
      skuCode: '',
      filters: {},
    },
  },
  VariantSelector: {
    displayName: 'VariantSelector',
    description: '',
    propTypes: {
      options: PropTypes.arrayOf(
        PropTypes.exact({
          label: PropTypes.string.isRequired,
          code: PropTypes.string.isRequired,
          lineItem: PropTypes.exact({
            name: PropTypes.string.isRequired,
            imageUrl: PropTypes.string,
          }),
        }).isRequired
      ).isRequired,
      name: PropTypes.string,
      children: PropTypes.func,
      type: PropTypes.oneOf<BaseSelectorType>(['select', 'radio']),
      loader: PropTypes.element,
      placeholder: PropTypes.string,
      skuCode: PropTypes.string,
    },
    defaultProps: {
      placeholder: 'select an variant',
      type: 'select' as BaseSelectorType,
    },
  },
  // VariantTemplate: {
  //   displayName: 'VariantTemplate',
  //   description: '',
  //   propTypes: {
  //     variants: PropTypes.object.isRequired,
  //     onChange: PropTypes.func,
  //     options: PropTypes.arrayOf(
  //       PropTypes.exact({
  //         label: PropTypes.string.isRequired,
  //         code: PropTypes.string.isRequired,
  //         lineItem: PropTypes.exact({
  //           name: PropTypes.string.isRequired,
  //           imageUrl: PropTypes.string,
  //         }),
  //       }).isRequired
  //     ).isRequired,
  //     name: PropTypes.string,
  //     children: PropTypes.func,
  //     type: PropTypes.oneOf<BaseSelectorType>(['select', 'radio']),
  //     loader: PropTypes.element,
  //     placeholder: PropTypes.string,
  //     skuCode: PropTypes.string,
  //   },
  // },
}

export default components
