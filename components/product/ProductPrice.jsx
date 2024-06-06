import { useLanguageContext } from '@/context/LanguageContext'
import { DiscountProduct } from 'components'
import { formatNumber } from 'utils'

const ProductPrice = props => {
  //? Props
  const { singleProduct, inStock, discount, price } = props

  // ? Dictionary
  const { dict } = useLanguageContext()

  //? Render(s)
  return (
    <div className={`${(singleProduct && 'flex flex-col-reverse') || ''}`}>
      <div className={`flex items-center ${(singleProduct && 'self-end') || ''}`}>
        <span className="text-sm text-gray-700">
          {formatNumber(price - (discount * price) / 100)}
        </span>
        <span className="ml-1">{dict.currency}</span>
      </div>

      {discount > 0 && (
        <div>
          {singleProduct && discount > 0 && inStock !== 0 && (
            <DiscountProduct discount={discount} />
          )}
          <span className="ml-2 text-sm text-gray-500 line-through">
            {formatNumber(price)}
            <span className="ml-1">{dict.currency}</span>
          </span>
        </div>
      )}
    </div>
  )
}

export default ProductPrice
