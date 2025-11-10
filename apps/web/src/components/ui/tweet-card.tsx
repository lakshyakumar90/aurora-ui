/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils"

interface TwitterIconProps {
  className?: string
  [key: string]: unknown
}

interface TweetProps{
  id: string;
  url: string;
  text: string;
  user: {
    name: string;
    screen_name: string;
    url: string;
    profile_image_url_https: string;
    verified: boolean;
    is_blue_verified: boolean;
  }
  photos?: { url: string; width: number; height: number }[];
  video?: { poster: string; src: string };
 
}


const Twitter = ({ className, ...props }: TwitterIconProps) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 24 24"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <g>
      <path fill="none" d="M0 0h24v24H0z"></path>
      <path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z"></path>
    </g>
  </svg>
)

const Verified = ({ className, ...props }: TwitterIconProps) => (
  <svg
    aria-label="Verified Account"
    viewBox="0 0 24 24"
    className={className}
    {...props}
  >
    <g fill="currentColor">
      <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
    </g>
  </svg>
)

export const truncate = (str: string | null, length: number) => {
  if (!str || str.length <= length) return str
  return `${str.slice(0, length - 3)}...`
}

export const TweetHeader = ({ tweet }: { tweet: TweetProps }) => (
  <div className="flex flex-row justify-between tracking-tight">
    <div className="flex items-center space-x-2">
      <a href={tweet.user.url} target="_blank" rel="noreferrer">
        <img
          title={`Profile picture of ${tweet.user.name}`}
          alt={tweet.user.screen_name}
          height={48}
          width={48}
          src={tweet.user.profile_image_url_https}
          className="overflow-hidden rounded-full border border-transparent"
        />
      </a>
      <div>
        <a
          href={tweet.user.url}
          target="_blank"
          rel="noreferrer"
          className="flex items-center font-semibold whitespace-nowrap"
        >
          {truncate(tweet.user.name, 20)}
          {(tweet.user.verified || tweet.user.is_blue_verified) && (
            <Verified className="ml-1 inline size-4 text-blue-500" />
          )}
        </a>
        <div className="flex items-center space-x-1">
          <a
            href={tweet.user.url}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-gray-500 transition-all duration-75"
          >
            @{truncate(tweet.user.screen_name, 16)}
          </a>
        </div>
      </div>
    </div>
    <a href={tweet.url} target="_blank" rel="noreferrer">
      <span className="sr-only">Link to tweet</span>
      <Twitter className="size-5 items-start text-[#3BA9EE] transition-all ease-in-out hover:scale-105" />
    </a>
  </div>
)

export const TweetBody = ({ text }: { text: string }) => (
  <div className="leading-normal tracking-tighter break-words text-sm font-normal">
    {text}
  </div>
)

export const TweetMedia = ({ tweet }: { tweet: TweetProps }) => {
  if (!tweet.video && !tweet.photos) return null
  return (
    <div className="flex flex-1 items-center justify-center mt-2">
      {tweet.video ? (
        <video
          poster={tweet.video.poster}
          autoPlay
          loop
          muted
          playsInline
          className="rounded-xl border shadow-sm"
        >
          <source src={tweet.video.src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className="relative flex transform-gpu snap-x snap-mandatory gap-4 overflow-x-auto">
          {tweet?.photos?.map((photo: { url: string; width: number; height: number }) => (
            <img
              key={photo.url}
              src={photo.url}
              width={photo.width}
              height={photo.height}
              alt={tweet.text}
              className="h-64 w-5/6 shrink-0 snap-center rounded-xl border object-cover shadow-sm"
            />
          ))}
        </div>
      )}
    </div>
  )
}

export const StaticTweetCard = ({
  className,
  ...props
}: {
  className?: string
}) => {
  // ✅ Static tweet data
  const tweet: TweetProps = {
    id: "1234567890",
    url: "https://twitter.com/elonmusk/status/1234567890",
    text: "Excited to announce a new era of clean energy innovation ⚡️🚀 #Tesla",
    user: {
      name: "Elon Musk",
      screen_name: "elonmusk",
      url: "https://twitter.com/elonmusk",
      profile_image_url_https:
        "https://pbs.twimg.com/profile_images/1590968738358079488/IY9Gx6Ok_400x400.jpg",
      verified: true,
      is_blue_verified: true,
    },
    photos: [
      {
        url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=872",
        width: 800,
        height: 450,
      },
    ],
  }

  return (
    <div
      className={cn(
        "relative flex h-fit w-full max-w-lg flex-col gap-2 overflow-hidden rounded-lg border p-4 backdrop-blur-md",
        className
      )}
      {...props}
    >
      <TweetHeader tweet={tweet} />
      <TweetBody text={tweet.text} />
      <TweetMedia tweet={tweet} />
    </div>
  )
}
