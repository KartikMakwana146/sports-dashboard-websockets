import { asc } from 'drizzle-orm';
import { Router } from 'express';
import { db } from '../db/db.js';
import { matches } from '../db/schema.js';
import { createMatchSchema , listMatchesQuerySchema } from '../validation/matches.js';
import { getMatchStatus } from '../utils/match-status.js';

export const matchRouter = Router();

const MAX_LIMIT = 100;

matchRouter.get('/', async (req, res) => {

    const parsed = listMatchesQuerySchema.safeParse(req.query);

    if (!parsed.success) {
        return res.status(400).json({ errors: parsed.error.flatten() });
    }

    const limit = Math.min(parsed.data.limit ?? 50, MAX_LIMIT);

    try {

        const data = await db
            .select()
            .from(matches)
            .limit(limit)
            .orderBy(asc(matches.startTime));

        res.json({ data });

    } catch (e) {
        res.status(500).json({ message: 'Error fetching matches' });
    }
});

matchRouter.post('/', async (req, res) => {

    const parsed = createMatchSchema.safeParse(req.body);

    if (!parsed.success) {
        return res.status(400).json({ errors: parsed.error.flatten() });
    }

    const { startTime, endTime, homeScore, awayScore } = parsed.data;

    try {
        
        const [event] = await db.insert(matches).values({
            ... parsed.data,
            startTime: new Date(startTime),
            endTime: new Date(endTime),
            homeScore: homeScore ?? 0,
            awayScore: awayScore ?? 0,
            status: getMatchStatus(startTime, endTime),
        }).returning(); 

        res.status(201).json({ data: event });

    } catch (e) {
        res.status(500).json({ message: 'Error creating match' });
    }
});