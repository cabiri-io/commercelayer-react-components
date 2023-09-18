import CommerceLayer from '#components/auth/CommerceLayer'
import LineItem from '#components/line_items/LineItem'
import LineItemsContainer from '#components/line_items/LineItemsContainer'
import LineItemsCount from '#components/line_items/LineItemsCount'
import LineItemImage from '#components/line_items/LineItemImage'
import OrderContainer from '#components/orders/OrderContainer'
import { render, screen } from '@testing-library/react'
import { type LocalContext } from '../utils/context'
import { getAccessToken } from 'mocks/getAccessToken'

interface AddToCartContext extends LocalContext {
  skuCode: string
  quantity: string
  lineItem: {
    name: string
    imageUrl?: string
  }
  lineItemOption: {
    skuOptionId: string
    options: Record<string, string>
    quantity?: number
  }
}

describe('Line items components', () => {
  beforeEach<AddToCartContext>(async (ctx) => {
    const { accessToken, endpoint } = await getAccessToken()
    if (accessToken != null && endpoint != null) {
      ctx.accessToken = accessToken
      ctx.endpoint = endpoint
      ctx.skuCode = 'BABYONBU000000E63E7412MX'
      ctx.quantity = '3'
      ctx.lineItem = {
        name: 'Darth Vader',
        imageUrl:
          'https://i.pinimg.com/736x/a5/32/de/a532de337eff9b1c1c4bfb8df73acea4--darth-vader-stencil-darth-vader-head.jpg?b=t'
      }
    }
  })
  it<AddToCartContext>('Can pass child function to LineItemImage', async (ctx) => {
    render(
      <CommerceLayer accessToken={ctx.accessToken} endpoint={ctx.endpoint}>
        <OrderContainer>
          <LineItemsContainer>
            <LineItemsCount data-testid='line-items-count' />
            <LineItem>
              <LineItemImage>
                {({src}) => {
                  return <span data-testid='image'>{src}</span>
                }}
              </LineItemImage>
            </LineItem>
          </LineItemsContainer>
        </OrderContainer>
      </CommerceLayer>
    )
    const image = screen.getByTestId(`image`)
    expect(image).toBeDefined()
    expect(image.textContent).toBe('https://i.pinimg.com/736x/a5/32/de/a532de337eff9b1c1c4bfb8df73acea4--darth-vader-stencil-darth-vader-head.jpg?b=t')
  })
})
