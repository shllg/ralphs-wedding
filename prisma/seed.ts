import { PrismaClient, InvitationState } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { config } from 'dotenv'

config({ path: '.env.local' })

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

async function main() {
  // Clear existing data
  await prisma.scheduleItem.deleteMany()
  await prisma.eventInvitation.deleteMany()
  await prisma.weddingEvent.deleteMany()

  console.log('Cleared existing data')

  // ============================================
  // 1. INTIMATE GARDEN WEDDING (Small - 12 guests)
  // ============================================
  const intimateWedding = await prisma.weddingEvent.create({
    data: {
      name: 'Sarah & James - Garden Ceremony',
      eventDate: new Date('2025-06-14T15:00:00'),
      location: 'Rosewood Garden Estate, Napa Valley, CA',
      invitationText: `Dear loved ones,

With hearts full of joy, we invite you to celebrate our wedding day in the intimate setting of Rosewood Garden Estate.

Join us for an afternoon of love, laughter, and good food as we begin our journey together as husband and wife.

Your presence is the greatest gift we could ask for.

With love,
Sarah & James`,
      scheduleItems: {
        create: [
          {
            dateTime: new Date('2025-06-14T15:00:00'),
            title: 'Guest Arrival & Welcome Drinks',
            description: 'Champagne and refreshments in the garden pavilion',
            location: 'Garden Pavilion',
          },
          {
            dateTime: new Date('2025-06-14T16:00:00'),
            title: 'Wedding Ceremony',
            description: 'Exchange of vows under the rose arbor',
            location: 'Rose Garden',
          },
          {
            dateTime: new Date('2025-06-14T17:00:00'),
            title: 'Cocktail Hour & Photos',
            description: 'Canapés and drinks while we take photos',
            location: 'Terrace',
          },
          {
            dateTime: new Date('2025-06-14T18:30:00'),
            title: 'Dinner Reception',
            description: 'Farm-to-table dinner with wine pairings',
            location: 'Greenhouse Dining Room',
          },
          {
            dateTime: new Date('2025-06-14T21:00:00'),
            title: 'Cake Cutting & Dancing',
            location: 'Garden Pavilion',
          },
        ],
      },
      invitations: {
        create: [
          { name: 'Margaret Thompson', email: 'margaret.t@email.com', state: InvitationState.ACCEPTED },
          { name: 'Robert Thompson', email: 'rob.thompson@email.com', state: InvitationState.ACCEPTED },
          { name: 'Emily Chen', email: 'emily.chen@email.com', state: InvitationState.ACCEPTED },
          { name: 'Michael Chen', email: 'm.chen@email.com', state: InvitationState.ACCEPTED },
          { name: 'David Wilson', email: 'david.w@email.com', state: InvitationState.ACCEPTED },
          { name: 'Lisa Anderson', email: 'lisa.a@email.com', state: InvitationState.PENDING },
          { name: 'Thomas Garcia', email: 'tom.garcia@email.com', state: InvitationState.ACCEPTED },
          { name: 'Rachel Kim', email: 'rachel.kim@email.com', state: InvitationState.ACCEPTED },
          { name: 'Andrew Miller', email: 'a.miller@email.com', state: InvitationState.DECLINED },
          { name: 'Sophie Brown', email: 'sophie.b@email.com', state: InvitationState.ACCEPTED },
          { name: 'Christopher Lee', email: 'chris.lee@email.com', state: InvitationState.PENDING },
          { name: 'Amanda Foster', email: 'amanda.f@email.com', state: InvitationState.ACCEPTED },
        ],
      },
    },
  })
  console.log(`Created intimate wedding: ${intimateWedding.name}`)

  // ============================================
  // 2. CLASSIC HOTEL WEDDING (Medium - 65 guests)
  // ============================================
  const mediumWedding = await prisma.weddingEvent.create({
    data: {
      name: 'Emma & William - Grand Ballroom Celebration',
      eventDate: new Date('2025-09-20T14:00:00'),
      location: 'The Fairmont Hotel, San Francisco, CA',
      invitationText: `Together with their families,

Emma Rose Mitchell
and
William James Parker

request the pleasure of your company
at the celebration of their marriage

Saturday, the twentieth of September
two thousand twenty-five
at two o'clock in the afternoon

The Fairmont Hotel
950 Mason Street
San Francisco, California

Dinner and dancing to follow

Black tie optional`,
      scheduleItems: {
        create: [
          {
            dateTime: new Date('2025-09-20T14:00:00'),
            title: 'Guest Arrival',
            description: 'Please be seated by 1:45 PM',
            location: 'Grand Ballroom Foyer',
          },
          {
            dateTime: new Date('2025-09-20T14:30:00'),
            title: 'Wedding Ceremony',
            description: 'Traditional ceremony with string quartet',
            location: 'Grand Ballroom',
          },
          {
            dateTime: new Date('2025-09-20T15:15:00'),
            title: 'Cocktail Reception',
            description: 'Signature cocktails, oyster bar, and hors d\'oeuvres',
            location: 'Terrace Room',
          },
          {
            dateTime: new Date('2025-09-20T17:00:00'),
            title: 'Ballroom Doors Open',
            description: 'Find your table and enjoy the welcome champagne',
            location: 'Grand Ballroom',
          },
          {
            dateTime: new Date('2025-09-20T17:30:00'),
            title: 'Grand Entrance & First Dance',
            location: 'Grand Ballroom',
          },
          {
            dateTime: new Date('2025-09-20T18:00:00'),
            title: 'Dinner Service',
            description: 'Three-course plated dinner with vegetarian options available',
            location: 'Grand Ballroom',
          },
          {
            dateTime: new Date('2025-09-20T19:30:00'),
            title: 'Speeches & Toasts',
            description: 'Words from the best man, maid of honor, and parents',
            location: 'Grand Ballroom',
          },
          {
            dateTime: new Date('2025-09-20T20:00:00'),
            title: 'Cake Cutting',
            location: 'Grand Ballroom',
          },
          {
            dateTime: new Date('2025-09-20T20:30:00'),
            title: 'Dancing',
            description: 'Live band and DJ until midnight',
            location: 'Grand Ballroom',
          },
          {
            dateTime: new Date('2025-09-20T22:00:00'),
            title: 'Late Night Snacks',
            description: 'Sliders, fries, and sweet treats',
            location: 'Terrace Room',
          },
        ],
      },
      invitations: {
        create: generateMediumGuestList(),
      },
    },
  })
  console.log(`Created medium wedding: ${mediumWedding.name}`)

  // ============================================
  // 3. GRAND ESTATE WEDDING (Large - 180 guests)
  // ============================================
  const largeWedding = await prisma.weddingEvent.create({
    data: {
      name: 'Olivia & Alexander - Chateau Celebration',
      eventDate: new Date('2025-08-02T13:00:00'),
      location: 'Château de Lumière, Sonoma County, CA',
      invitationText: `Mr. and Mrs. Richard Montgomery
and
Mr. and Mrs. Alexander Blackwood Sr.

request the honour of your presence
at the marriage of their children

Olivia Grace Montgomery
to
Alexander James Blackwood III

Saturday, the second of August
two thousand twenty-five
at one o'clock in the afternoon

Château de Lumière
Sonoma County, California

Reception immediately following
Formal attire requested

Dinner, dancing, and fireworks

Please respond by the first of July`,
      scheduleItems: {
        create: [
          {
            dateTime: new Date('2025-08-02T13:00:00'),
            title: 'Guest Arrival & Seating',
            description: 'Welcome refreshments available. Ceremony begins promptly at 1:30 PM.',
            location: 'Vineyard Lawn',
          },
          {
            dateTime: new Date('2025-08-02T13:30:00'),
            title: 'Wedding Ceremony',
            description: 'Traditional ceremony with full orchestra',
            location: 'Vineyard Lawn',
          },
          {
            dateTime: new Date('2025-08-02T14:30:00'),
            title: 'Champagne Toast',
            description: 'Celebration toast following the ceremony',
            location: 'Vineyard Lawn',
          },
          {
            dateTime: new Date('2025-08-02T15:00:00'),
            title: 'Cocktail Hour',
            description: 'Full bar, raw bar, carving stations, and passed hors d\'oeuvres',
            location: 'Château Terrace & Gardens',
          },
          {
            dateTime: new Date('2025-08-02T16:00:00'),
            title: 'Lawn Games & Entertainment',
            description: 'Croquet, bocce ball, live jazz trio',
            location: 'West Lawn',
          },
          {
            dateTime: new Date('2025-08-02T17:30:00'),
            title: 'Reception Begins',
            description: 'Ballroom doors open, find your table',
            location: 'Grand Ballroom',
          },
          {
            dateTime: new Date('2025-08-02T18:00:00'),
            title: 'Grand Entrance',
            description: 'Introduction of the wedding party and newlyweds',
            location: 'Grand Ballroom',
          },
          {
            dateTime: new Date('2025-08-02T18:15:00'),
            title: 'First Dance',
            location: 'Grand Ballroom',
          },
          {
            dateTime: new Date('2025-08-02T18:30:00'),
            title: 'Welcome Speeches',
            description: 'Words from the fathers of the bride and groom',
            location: 'Grand Ballroom',
          },
          {
            dateTime: new Date('2025-08-02T19:00:00'),
            title: 'Dinner Service',
            description: 'Five-course gourmet dinner with wine pairings from estate vineyard',
            location: 'Grand Ballroom',
          },
          {
            dateTime: new Date('2025-08-02T20:30:00'),
            title: 'Toasts & Speeches',
            description: 'Best man, maid of honor, and special guests',
            location: 'Grand Ballroom',
          },
          {
            dateTime: new Date('2025-08-02T21:00:00'),
            title: 'Cake Cutting',
            description: 'Six-tier wedding cake by renowned pastry chef',
            location: 'Grand Ballroom',
          },
          {
            dateTime: new Date('2025-08-02T21:30:00'),
            title: 'Parent Dances',
            description: 'Father-daughter and mother-son dances',
            location: 'Grand Ballroom',
          },
          {
            dateTime: new Date('2025-08-02T22:00:00'),
            title: 'Dancing',
            description: '12-piece band and celebrity DJ',
            location: 'Grand Ballroom',
          },
          {
            dateTime: new Date('2025-08-02T23:00:00'),
            title: 'Fireworks Display',
            description: 'Please gather on the terrace for the show',
            location: 'Château Terrace',
          },
          {
            dateTime: new Date('2025-08-02T23:30:00'),
            title: 'After Party',
            description: 'Late night bites, dessert bar, and dancing until 2 AM',
            location: 'Wine Cellar Lounge',
          },
        ],
      },
      invitations: {
        create: generateLargeGuestList(),
      },
    },
  })
  console.log(`Created large wedding: ${largeWedding.name}`)

  // ============================================
  // 4. DESTINATION BEACH WEDDING (Small-Medium - 35 guests)
  // ============================================
  const beachWedding = await prisma.weddingEvent.create({
    data: {
      name: 'Mia & Noah - Sunset Beach Ceremony',
      eventDate: new Date('2025-11-15T16:00:00'),
      location: 'Four Seasons Resort, Maui, Hawaii',
      invitationText: `Aloha!

Mia Tanaka & Noah Sullivan
invite you to join them as they say "I do"
with their toes in the sand

Saturday, November 15th, 2025
4:00 PM

Four Seasons Resort
Wailea Beach, Maui

Reception to follow at the Oceanfront Pavilion

Island casual attire (no shoes required!)

As this is a destination celebration, your presence is our present.
Please RSVP by September 1st.`,
      scheduleItems: {
        create: [
          {
            dateTime: new Date('2025-11-15T16:00:00'),
            title: 'Beach Ceremony',
            description: 'Barefoot ceremony at sunset. Leis provided.',
            location: 'Wailea Beach',
          },
          {
            dateTime: new Date('2025-11-15T17:00:00'),
            title: 'Sunset Photos & Mai Tais',
            description: 'Enjoy tropical drinks while we capture the golden hour',
            location: 'Beach & Resort Grounds',
          },
          {
            dateTime: new Date('2025-11-15T18:30:00'),
            title: 'Luau Reception',
            description: 'Traditional Hawaiian luau with live music',
            location: 'Oceanfront Pavilion',
          },
          {
            dateTime: new Date('2025-11-15T19:30:00'),
            title: 'Dinner',
            description: 'Hawaiian fusion cuisine and fresh seafood',
            location: 'Oceanfront Pavilion',
          },
          {
            dateTime: new Date('2025-11-15T21:00:00'),
            title: 'Fire Dancer Performance',
            location: 'Beach',
          },
          {
            dateTime: new Date('2025-11-15T21:30:00'),
            title: 'Dancing Under the Stars',
            description: 'Island music and dancing',
            location: 'Oceanfront Pavilion',
          },
          {
            dateTime: new Date('2025-11-16T10:00:00'),
            title: 'Morning-After Brunch',
            description: 'Casual brunch for all guests (optional)',
            location: 'Resort Restaurant',
          },
        ],
      },
      invitations: {
        create: [
          { name: 'Kenji Tanaka', email: 'kenji.tanaka@email.com', state: InvitationState.ACCEPTED },
          { name: 'Yuki Tanaka', email: 'yuki.tanaka@email.com', state: InvitationState.ACCEPTED },
          { name: 'Patrick Sullivan', email: 'pat.sullivan@email.com', state: InvitationState.ACCEPTED },
          { name: 'Mary Sullivan', email: 'mary.sullivan@email.com', state: InvitationState.ACCEPTED },
          { name: 'Hana Nakamura', email: 'hana.n@email.com', state: InvitationState.ACCEPTED },
          { name: 'Ryan O\'Brien', email: 'ryan.obrien@email.com', state: InvitationState.ACCEPTED },
          { name: 'Kayla O\'Brien', email: 'kayla.obrien@email.com', state: InvitationState.ACCEPTED },
          { name: 'Brandon Lee', email: 'brandon.lee@email.com', state: InvitationState.PENDING },
          { name: 'Jennifer Lee', email: 'jen.lee@email.com', state: InvitationState.PENDING },
          { name: 'Marcus Johnson', email: 'marcus.j@email.com', state: InvitationState.ACCEPTED },
          { name: 'Alicia Johnson', email: 'alicia.j@email.com', state: InvitationState.ACCEPTED },
          { name: 'Derek Chang', email: 'derek.chang@email.com', state: InvitationState.DECLINED },
          { name: 'Samantha Wright', email: 'sam.wright@email.com', state: InvitationState.ACCEPTED },
          { name: 'Tyler Wright', email: 'tyler.wright@email.com', state: InvitationState.ACCEPTED },
          { name: 'Megan Torres', email: 'megan.torres@email.com', state: InvitationState.ACCEPTED },
          { name: 'Jason Kim', email: 'jason.kim@email.com', state: InvitationState.ACCEPTED },
          { name: 'Christina Kim', email: 'christina.kim@email.com', state: InvitationState.ACCEPTED },
          { name: 'Daniel Reyes', email: 'dan.reyes@email.com', state: InvitationState.PENDING },
          { name: 'Nicole Adams', email: 'nicole.adams@email.com', state: InvitationState.ACCEPTED },
          { name: 'Kevin Adams', email: 'kevin.adams@email.com', state: InvitationState.ACCEPTED },
          { name: 'Ashley Patel', email: 'ashley.patel@email.com', state: InvitationState.ACCEPTED },
          { name: 'Raj Patel', email: 'raj.patel@email.com', state: InvitationState.ACCEPTED },
          { name: 'Brittany Cole', email: 'brit.cole@email.com', state: InvitationState.DECLINED },
          { name: 'Austin Murphy', email: 'austin.murphy@email.com', state: InvitationState.ACCEPTED },
          { name: 'Lauren Murphy', email: 'lauren.murphy@email.com', state: InvitationState.ACCEPTED },
          { name: 'Tiffany Wong', email: 'tiffany.wong@email.com', state: InvitationState.ACCEPTED },
          { name: 'Chris Evans', email: 'chris.evans@email.com', state: InvitationState.PENDING },
          { name: 'Michelle Davis', email: 'michelle.d@email.com', state: InvitationState.ACCEPTED },
          { name: 'Eric Davis', email: 'eric.davis@email.com', state: InvitationState.ACCEPTED },
          { name: 'Amanda Scott', email: 'amanda.scott@email.com', state: InvitationState.ACCEPTED },
          { name: 'Jake Morrison', email: 'jake.morrison@email.com', state: InvitationState.ACCEPTED },
          { name: 'Stephanie Chen', email: 'steph.chen@email.com', state: InvitationState.DECLINED },
          { name: 'Nathan Brooks', email: 'nathan.brooks@email.com', state: InvitationState.ACCEPTED },
          { name: 'Emily Brooks', email: 'emily.brooks@email.com', state: InvitationState.ACCEPTED },
          { name: 'Victoria Hall', email: 'victoria.hall@email.com', state: InvitationState.PENDING },
        ],
      },
    },
  })
  console.log(`Created beach wedding: ${beachWedding.name}`)

  console.log('\nSeeding complete!')
  console.log(`- ${intimateWedding.name}: 12 guests, 5 schedule items`)
  console.log(`- ${mediumWedding.name}: 65 guests, 10 schedule items`)
  console.log(`- ${largeWedding.name}: 180 guests, 16 schedule items`)
  console.log(`- ${beachWedding.name}: 35 guests, 7 schedule items`)
}

function generateMediumGuestList() {
  const guests = [
    // Immediate family
    { name: 'Richard Mitchell', email: 'richard.mitchell@email.com', state: InvitationState.ACCEPTED },
    { name: 'Catherine Mitchell', email: 'catherine.mitchell@email.com', state: InvitationState.ACCEPTED },
    { name: 'James Parker Sr.', email: 'james.parker.sr@email.com', state: InvitationState.ACCEPTED },
    { name: 'Elizabeth Parker', email: 'elizabeth.parker@email.com', state: InvitationState.ACCEPTED },
    { name: 'Oliver Mitchell', email: 'oliver.mitchell@email.com', state: InvitationState.ACCEPTED },
    { name: 'Grace Mitchell', email: 'grace.mitchell@email.com', state: InvitationState.ACCEPTED },
    { name: 'Charlotte Parker', email: 'charlotte.parker@email.com', state: InvitationState.ACCEPTED },
    { name: 'Henry Parker', email: 'henry.parker@email.com', state: InvitationState.ACCEPTED },
    // Extended family
    { name: 'Robert Mitchell', email: 'robert.m@email.com', state: InvitationState.ACCEPTED },
    { name: 'Susan Mitchell', email: 'susan.m@email.com', state: InvitationState.ACCEPTED },
    { name: 'Thomas Mitchell', email: 'thomas.m@email.com', state: InvitationState.PENDING },
    { name: 'Margaret Chen', email: 'margaret.chen@email.com', state: InvitationState.ACCEPTED },
    { name: 'William Chen', email: 'william.chen@email.com', state: InvitationState.ACCEPTED },
    { name: 'Barbara Hughes', email: 'barbara.h@email.com', state: InvitationState.ACCEPTED },
    { name: 'Donald Hughes', email: 'donald.h@email.com', state: InvitationState.DECLINED },
    { name: 'Patricia Coleman', email: 'pat.coleman@email.com', state: InvitationState.ACCEPTED },
    { name: 'George Coleman', email: 'george.coleman@email.com', state: InvitationState.ACCEPTED },
    { name: 'Linda Foster', email: 'linda.foster@email.com', state: InvitationState.ACCEPTED },
    { name: 'Edward Foster', email: 'edward.foster@email.com', state: InvitationState.ACCEPTED },
    { name: 'Nancy Parker', email: 'nancy.parker@email.com', state: InvitationState.ACCEPTED },
    // Wedding party
    { name: 'Jessica Taylor', email: 'jessica.taylor@email.com', state: InvitationState.ACCEPTED },
    { name: 'Benjamin White', email: 'ben.white@email.com', state: InvitationState.ACCEPTED },
    { name: 'Sophia Rodriguez', email: 'sophia.r@email.com', state: InvitationState.ACCEPTED },
    { name: 'Daniel Kim', email: 'daniel.kim@email.com', state: InvitationState.ACCEPTED },
    { name: 'Ava Martinez', email: 'ava.martinez@email.com', state: InvitationState.ACCEPTED },
    { name: 'Matthew Thompson', email: 'matt.thompson@email.com', state: InvitationState.ACCEPTED },
    { name: 'Isabella Garcia', email: 'isabella.g@email.com', state: InvitationState.ACCEPTED },
    { name: 'Christopher Lee', email: 'chris.lee@email.com', state: InvitationState.ACCEPTED },
    // Friends
    { name: 'Megan Anderson', email: 'megan.anderson@email.com', state: InvitationState.ACCEPTED },
    { name: 'Ryan Anderson', email: 'ryan.anderson@email.com', state: InvitationState.ACCEPTED },
    { name: 'Lauren Davis', email: 'lauren.davis@email.com', state: InvitationState.ACCEPTED },
    { name: 'Justin Davis', email: 'justin.davis@email.com', state: InvitationState.ACCEPTED },
    { name: 'Ashley Brown', email: 'ashley.brown@email.com', state: InvitationState.PENDING },
    { name: 'Kevin Brown', email: 'kevin.brown@email.com', state: InvitationState.PENDING },
    { name: 'Samantha Wilson', email: 'sam.wilson@email.com', state: InvitationState.ACCEPTED },
    { name: 'Brandon Wilson', email: 'brandon.wilson@email.com', state: InvitationState.ACCEPTED },
    { name: 'Rachel Moore', email: 'rachel.moore@email.com', state: InvitationState.ACCEPTED },
    { name: 'Tyler Moore', email: 'tyler.moore@email.com', state: InvitationState.ACCEPTED },
    { name: 'Nicole Jackson', email: 'nicole.jackson@email.com', state: InvitationState.DECLINED },
    { name: 'Derek Jackson', email: 'derek.jackson@email.com', state: InvitationState.DECLINED },
    { name: 'Stephanie Harris', email: 'steph.harris@email.com', state: InvitationState.ACCEPTED },
    { name: 'Michael Harris', email: 'michael.harris@email.com', state: InvitationState.ACCEPTED },
    { name: 'Amanda Clark', email: 'amanda.clark@email.com', state: InvitationState.ACCEPTED },
    { name: 'Joshua Clark', email: 'josh.clark@email.com', state: InvitationState.ACCEPTED },
    { name: 'Brittany Lewis', email: 'brittany.lewis@email.com', state: InvitationState.ACCEPTED },
    { name: 'Andrew Lewis', email: 'andrew.lewis@email.com', state: InvitationState.ACCEPTED },
    // Colleagues
    { name: 'David Young', email: 'david.young@email.com', state: InvitationState.ACCEPTED },
    { name: 'Sarah Young', email: 'sarah.young@email.com', state: InvitationState.ACCEPTED },
    { name: 'Jennifer King', email: 'jen.king@email.com', state: InvitationState.PENDING },
    { name: 'Mark Wright', email: 'mark.wright@email.com', state: InvitationState.ACCEPTED },
    { name: 'Lisa Wright', email: 'lisa.wright@email.com', state: InvitationState.ACCEPTED },
    { name: 'Brian Scott', email: 'brian.scott@email.com', state: InvitationState.ACCEPTED },
    { name: 'Emily Scott', email: 'emily.scott@email.com', state: InvitationState.ACCEPTED },
    { name: 'Jason Green', email: 'jason.green@email.com', state: InvitationState.DECLINED },
    { name: 'Melissa Adams', email: 'melissa.adams@email.com', state: InvitationState.ACCEPTED },
    { name: 'Steven Adams', email: 'steven.adams@email.com', state: InvitationState.ACCEPTED },
    { name: 'Michelle Baker', email: 'michelle.baker@email.com', state: InvitationState.ACCEPTED },
    { name: 'Eric Baker', email: 'eric.baker@email.com', state: InvitationState.ACCEPTED },
    { name: 'Kimberly Nelson', email: 'kim.nelson@email.com', state: InvitationState.ACCEPTED },
    { name: 'Patrick Nelson', email: 'pat.nelson@email.com', state: InvitationState.ACCEPTED },
    { name: 'Angela Hill', email: 'angela.hill@email.com', state: InvitationState.PENDING },
    { name: 'Timothy Hill', email: 'tim.hill@email.com', state: InvitationState.PENDING },
    { name: 'Rebecca Campbell', email: 'rebecca.c@email.com', state: InvitationState.ACCEPTED },
  ]
  return guests
}

function generateLargeGuestList() {
  const firstNames = [
    'James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph', 'Thomas', 'Charles',
    'Christopher', 'Daniel', 'Matthew', 'Anthony', 'Mark', 'Donald', 'Steven', 'Paul', 'Andrew', 'Joshua',
    'Kenneth', 'Kevin', 'Brian', 'George', 'Timothy', 'Ronald', 'Edward', 'Jason', 'Jeffrey', 'Ryan',
    'Jacob', 'Gary', 'Nicholas', 'Eric', 'Jonathan', 'Stephen', 'Larry', 'Justin', 'Scott', 'Brandon',
    'Benjamin', 'Samuel', 'Raymond', 'Gregory', 'Frank', 'Alexander', 'Patrick', 'Jack', 'Dennis', 'Jerry',
    'Mary', 'Patricia', 'Jennifer', 'Linda', 'Barbara', 'Elizabeth', 'Susan', 'Jessica', 'Sarah', 'Karen',
    'Lisa', 'Nancy', 'Betty', 'Margaret', 'Sandra', 'Ashley', 'Kimberly', 'Emily', 'Donna', 'Michelle',
    'Dorothy', 'Carol', 'Amanda', 'Melissa', 'Deborah', 'Stephanie', 'Rebecca', 'Sharon', 'Laura', 'Cynthia',
    'Kathleen', 'Amy', 'Angela', 'Shirley', 'Anna', 'Brenda', 'Pamela', 'Emma', 'Nicole', 'Helen',
    'Samantha', 'Katherine', 'Christine', 'Debra', 'Rachel', 'Carolyn', 'Janet', 'Catherine', 'Maria', 'Heather',
  ]

  const lastNames = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
    'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
    'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson',
    'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
    'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts',
  ]

  const guests: Array<{ name: string; email: string; state: InvitationState }> = []
  const usedEmails = new Set<string>()

  // Add VIP family members first (all accepted)
  const vipGuests = [
    'Richard Montgomery', 'Victoria Montgomery', 'Alexander Blackwood Sr.', 'Eleanor Blackwood',
    'Sebastian Montgomery', 'Isabelle Montgomery', 'Marcus Blackwood', 'Sophia Blackwood',
    'Theodore Montgomery', 'Arabella Montgomery', 'Frederick Blackwood', 'Genevieve Blackwood',
  ]

  for (const name of vipGuests) {
    const email = name.toLowerCase().replace(' ', '.') + '@email.com'
    guests.push({ name, email, state: InvitationState.ACCEPTED })
    usedEmails.add(email)
  }

  // Generate remaining guests
  while (guests.length < 180) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
    const name = `${firstName} ${lastName}`
    const emailBase = `${firstName.toLowerCase()}.${lastName.toLowerCase()}`
    let email = `${emailBase}@email.com`

    // Handle duplicate emails
    let counter = 1
    while (usedEmails.has(email)) {
      email = `${emailBase}${counter}@email.com`
      counter++
    }
    usedEmails.add(email)

    // Randomly assign state with realistic distribution
    // 75% accepted, 15% pending, 10% declined
    const rand = Math.random()
    let state: InvitationState
    if (rand < 0.75) {
      state = InvitationState.ACCEPTED
    } else if (rand < 0.90) {
      state = InvitationState.PENDING
    } else {
      state = InvitationState.DECLINED
    }

    guests.push({ name, email, state })
  }

  return guests
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
