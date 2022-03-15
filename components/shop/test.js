{
  /* <LinkBox
  as='div'
  className='rounded-lg p-3 transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 hover:shadow-md'
>
  
  <div className='relative h-36 w-36 sm:h-52 sm:w-52'>
    <Image
      src={elem?.attributes?.image?.data?.attributes?.url}
      layout='fill'
      objectFit='cover'
      placeholder='blur'
      blurDataURL={
        elem?.attributes?.image?.data?.attributes?.formats?.small?.url
      }
      alt={elem?.attributes?.name}
      className='transition delay-150 duration-500 ease-in-out hover:scale-110'
    />
  </div>
  
  <div className='flex'>
    
    <div className='flex flex-col'>
      <Text className='font-semibold sm:text-xl '>
        {elem?.attributes?.name}
      </Text>
      
      {globalCurr == 'naira' ? (
        <div className='flex items-center space-x-2'>
          <Text className='font-semibold sm:text-lg'>
            &#8358;{elem?.attributes?.nairaSalePrice}
          </Text>
          <Text as='s' className='text-sm font-semibold text-gray-400'>
            &#8358;{elem?.attributes?.nairaPrice}
          </Text>
        </div>
      ) : (
        <div className='flex items-center space-x-2'>
          <Text className='font-semibold sm:text-lg'>
            &#x24;{elem?.attributes?.dollarSalePrice}
          </Text>
          <Text as='s' className='text-sm font-semibold text-gray-400'>
            &#x24;{elem?.attributes?.dollarPrice}
          </Text>
        </div>
      )}
    </div>
  </div>
  
  <div className='flex  pt-4'>
    <Link href={`/product/${elem?.id}/${elem?.attributes?.slug}`} passHref>
      <LinkOverlay
        // onClick={() => handleActive('shop')}
        className='flex items-center justify-center rounded-lg bg-teal-500 px-2 py-1 font-semibold text-white  transition duration-300 ease-in-out hover:bg-teal-700 hover:text-white hover:shadow-md hover:shadow-teal-200  sm:px-4 sm:py-2 '
      >
        Select Options
      </LinkOverlay>
    </Link>
  </div>
</LinkBox>; */
}
