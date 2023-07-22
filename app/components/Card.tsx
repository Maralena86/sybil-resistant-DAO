
import Image from 'next/image'
import Link from 'next/link'
export function Card() {
  return (

        <div className="relative card py-6 px-6 rounded-3xl w-82 my-4 shadow-xl">
            <div className="  card-icon flex items-center absolute rounded-full py-4 px-4 shadow-xl left-4 -top-6">
               
            <Image
              src="/gitcoinco.png"
              width={30}
              height={30}
              alt="Gitcoin"
            />
           
            </div>
            <div className="  card-icon flex items-center absolute rounded-full py-4 px-4 shadow-xl right-4 -top-6">
            <Image
              src="/sismo.png"
              width={30}
              height={30}
              alt="Gitcoin"
            />
            </div>
            <div className="mt-8 text-center">
                <p className="text-xl font-semibold my-2">Join the  Sybil Resitant DAO</p>
                <div className='py-6'>
                  <div className="flex space-x-2   ">
                    
                      
                      <p>Score</p> 
                  </div>
                  <div className="flex text-gray-400">
                      
                      <Link href="#">There is a link </Link>
                        
                  </div>
                </div>
                

                <div className="flex justify-between">
                    
                    
                  <div className="text-base card-button font-semibold">
                        <button>Mint </button>
                        
                    </div>
                </div>
            </div>
        </div>

       
  )
}